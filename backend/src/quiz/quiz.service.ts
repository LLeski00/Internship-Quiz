import { Injectable } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class QuizService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createQuizDto: CreateQuizDto) {
    return 'This action adds a new quiz';
  }

  async findAll() {
    return await this.prisma.quiz.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.quiz.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateQuizDto: UpdateQuizDto) {
    return `This action updates a #${id} quiz`;
  }

  async remove(id: number) {
    return `This action removes a #${id} quiz`;
  }
}
