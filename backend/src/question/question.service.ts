import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class QuestionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createQuestionDto: CreateQuestionDto) {
    return 'This action adds a new question';
  }

  async findAll() {
    return this.prisma.question.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.question.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return `This action updates a #${id} question`;
  }

  async remove(id: number) {
    return `This action removes a #${id} question`;
  }
}
