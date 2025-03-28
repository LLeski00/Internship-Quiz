import { Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AnswerService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAnswerDto: CreateAnswerDto) {
    return 'This action adds a new answer';
  }

  async findAll() {
    return this.prisma.answer.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.answer.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateAnswerDto: UpdateAnswerDto) {
    return `This action updates a #${id} answer`;
  }

  async remove(id: number) {
    return `This action removes a #${id} answer`;
  }
}
