import { Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Answer } from './entities/answer.entity';

@Injectable()
export class AnswerService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAnswerDto: CreateAnswerDto) {
    return 'This action adds a new answer';
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

  async update(id: number, updateAnswerDto: UpdateAnswerDto) {
    return `This action updates a #${id} answer`;
  }

  async remove(id: number) {
    return `This action removes a #${id} answer`;
  }
}
