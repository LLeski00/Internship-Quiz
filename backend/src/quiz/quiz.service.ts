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
    const newQuiz = await this.prisma.quiz.create({
      data: {
        title: createQuizDto.title,
        categoryId: createQuizDto.categoryId,
        questions: createQuizDto.questions
          ? {
              create: createQuizDto.questions.map((question) => ({
                text: question.text,
                type: question.type,
                answers: {
                  create: question.answers.map((answer) => ({
                    text: answer.text,
                    isCorrect: answer.isCorrect,
                  })),
                },
              })),
            }
          : undefined,
      },
    });

    return newQuiz;
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

  async update(id: string, updateQuizDto: UpdateQuizDto) {
    const { questions, ...quizData } = updateQuizDto;

    return this.prisma.quiz.update({
      where: { id },
      data: {
        ...quizData,
        questions: {
          upsert: questions?.map((question) => ({
            where: { id: question.id },
            update: {
              text: question.text,
              type: question.type,
            },
            create: {
              text: question.text,
              type: question.type,
              quizId: id,
            },
          })),
        },
      },
    });
  }

  async remove(id: string) {
    return this.prisma.quiz.delete({ where: { id } });
  }
}
