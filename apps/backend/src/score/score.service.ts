import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateScoreDto } from './dto/create-score.dto';
import { UpdateScoreDto } from './dto/update-score.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Score } from './entities/score.entity';
import { ScoreDetails } from './entities/score-details.entity';
import { UserService } from 'src/user/user.service';
import { QuizService } from 'src/quiz/quiz.service';

@Injectable()
export class ScoreService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
    private readonly quizService: QuizService,
  ) {}

  async create(createScoreDto: CreateScoreDto) {
    if (
      createScoreDto.score === undefined ||
      createScoreDto.score === null ||
      !createScoreDto.quizId ||
      createScoreDto.time === undefined ||
      createScoreDto.time === null ||
      !createScoreDto.userId
    )
      throw new BadRequestException('The score object is invalid');

    const quiz = await this.quizService.doesExist(createScoreDto.quizId);
    if (!quiz) throw new NotFoundException("The quiz doesn't exist");
    const user = await this.userService.doesExist(createScoreDto.userId);
    if (!user) throw new NotFoundException("The user doesn't exist");
    const newScore = await this.prisma.score.create({
      data: {
        score: createScoreDto.score,
        time: createScoreDto.time,
        quizId: createScoreDto.quizId,
        userId: createScoreDto.userId,
      },
    });
    return newScore;
  }

  async getAll() {
    const scores = await this.prisma.score.findMany();
    return scores.map((s) => Score.fromPrisma(s));
  }

  async getById(id: string) {
    const score = await this.prisma.score.findUnique({
      where: { id },
    });
    if (!score) throw new NotFoundException("The score doesn't exist");
    return Score.fromPrisma(score);
  }

  async getByQuizId(quizId: string) {
    const scores = await this.prisma.score.findMany({
      where: { quizId },
      include: {
        user: true,
        quiz: {
          include: {
            category: true,
          },
        },
      },
    });
    return scores.map((s) => ScoreDetails.fromPrisma(s));
  }

  async update(id: string, updateScoreDto: UpdateScoreDto) {
    const score = await this.getById(id);
    if (!score) throw new NotFoundException("The score doesn't exist");

    if (updateScoreDto.quizId) {
      const quiz = await this.quizService.doesExist(updateScoreDto.quizId);
      if (!quiz) throw new NotFoundException("The quiz doesn't exist");
    }

    if (updateScoreDto.userId) {
      const user = await this.userService.doesExist(updateScoreDto.userId);
      if (!user) throw new NotFoundException("The user doesn't exist");
    }

    return this.prisma.score.update({
      where: { id },
      data: {
        score: updateScoreDto.score,
        time: updateScoreDto.time,
        userId: updateScoreDto.userId,
        quizId: updateScoreDto.quizId,
      },
    });
  }

  async remove(id: string) {
    const score = await this.getById(id);
    if (!score) throw new NotFoundException("The score doesn't exist");
    return this.prisma.score.delete({ where: { id } });
  }
}
