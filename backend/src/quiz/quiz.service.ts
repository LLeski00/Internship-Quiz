import { Injectable } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Quiz } from './entities/quiz.entity';
import { QuizDetails } from './entities/quiz-details.entity';

@Injectable()
export class QuizService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createQuizDto: CreateQuizDto) {
    return 'This action adds a new quiz';
  }

  async getAll() {
    const quizes = await this.prisma.quiz.findMany();
    return quizes.map((q) => Quiz.fromPrisma(q));
  }

  async getById(id: string) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id },
      include: {
        questions: {
          include: {
            answers: true,
          },
        },
        category: true,
        scores: true,
      },
    });
    return QuizDetails.fromPrisma(quiz);
  }

  async getByTitle(title: string) {
    const quizes = await this.prisma.quiz.findMany({
      where: {
        title: {
          contains: title,
          mode: 'insensitive',
        },
      },
    });
    return quizes.map((q) => Quiz.fromPrisma(q));
  }

  async update(id: number, updateQuizDto: UpdateQuizDto) {
    return `This action updates a #${id} quiz`;
  }

  async remove(id: number) {
    return `This action removes a #${id} quiz`;
  }
}
