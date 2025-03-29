import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Question } from './entities/question.entity';

@Injectable()
export class QuestionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createQuestionDto: CreateQuestionDto) {
    return 'This action adds a new question';
  }

  async getAll() {
    const questions = await this.prisma.question.findMany();
    return questions.map((q) => Question.from(q));
  }

  async getById(id: string) {
    const question = await this.prisma.question.findUnique({
      where: { id },
    });
    return Question.from(question);
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return `This action updates a #${id} question`;
  }

  async remove(id: number) {
    return `This action removes a #${id} question`;
  }
}
