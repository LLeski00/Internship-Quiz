import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Answer } from './entities/answer.entity';
import { QuestionService } from 'src/question/question.service';

@Injectable()
export class AnswerService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly questionService: QuestionService,
  ) {}

  async create(createAnswerDto: CreateAnswerDto) {
    if (
      createAnswerDto.isCorrect === undefined ||
      !createAnswerDto.questionId ||
      !createAnswerDto.text
    )
      throw new BadRequestException('The answer object is invalid');

    const question = await this.questionService.doesExist(
      createAnswerDto.questionId,
    );
    if (!question) throw new NotFoundException("The question doesn't exist");
    const newAnswer = await this.prisma.answer.create({
      data: {
        isCorrect: createAnswerDto.isCorrect,
        text: createAnswerDto.text,
        questionId: createAnswerDto.questionId,
      },
    });
    return newAnswer;
  }

  async getAll() {
    const answers = await this.prisma.answer.findMany();
    return answers.map((a) => Answer.fromPrisma(a));
  }

  async getById(id: string) {
    const answer = await this.prisma.answer.findUnique({
      where: { id },
    });
    if (!answer) throw new NotFoundException("The answer doesn't exist");
    return Answer.fromPrisma(answer);
  }

  async update(id: string, updateAnswerDto: UpdateAnswerDto) {
    const answer = await this.getById(id);
    if (!answer) throw new NotFoundException("The answer doesn't exist");

    if (updateAnswerDto.questionId) {
      const question = await this.questionService.doesExist(
        updateAnswerDto.questionId,
      );
      if (!question) throw new NotFoundException("The question doesn't exist");
    }

    return this.prisma.answer.update({
      where: { id },
      data: {
        isCorrect: updateAnswerDto.isCorrect,
        text: updateAnswerDto.text,
        questionId: updateAnswerDto.questionId,
      },
    });
  }

  async remove(id: string) {
    const answer = await this.getById(id);
    if (!answer) throw new NotFoundException("The answer doesn't exist");
    return this.prisma.answer.delete({ where: { id } });
  }
}
