import { Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Answer } from './entities/answer.entity';

@Injectable()
export class AnswerService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAnswerDto: CreateAnswerDto) {
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
    return Answer.fromPrisma(answer);
  }

  async update(id: string, updateAnswerDto: UpdateAnswerDto) {
    return this.prisma.answer.update({
      where: { id },
      data: updateAnswerDto,
    });
  }

  async remove(id: string) {
    return this.prisma.answer.delete({ where: { id } });
  }
}
