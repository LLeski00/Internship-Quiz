import { Injectable } from '@nestjs/common';
import { CreateScoreDto } from './dto/create-score.dto';
import { UpdateScoreDto } from './dto/update-score.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Score } from './entities/score.entity';
import { ScoreDetails } from './entities/score-details.entity';

@Injectable()
export class ScoreService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createScoreDto: CreateScoreDto) {
    const newScore = await this.prisma.score.create({
      data: {
        points: createScoreDto.points,
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
    return Score.fromPrisma(score);
  }

  async getByQuizId(quizId: string) {
    const scores = await this.prisma.score.findMany({
      where: { quizId },
      include: {
        user: true,
      },
    });
    return scores.map((s) => ScoreDetails.fromPrisma(s));
  }

  async update(id: string, updateScoreDto: UpdateScoreDto) {
    return this.prisma.score.update({ where: { id }, data: updateScoreDto });
  }

  async remove(id: string) {
    return this.prisma.score.delete({ where: { id } });
  }
}
