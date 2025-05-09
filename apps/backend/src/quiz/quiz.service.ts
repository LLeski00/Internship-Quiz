import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Quiz } from './entities/quiz.entity';
import { QuizDetails } from './entities/quiz-details.entity';
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class QuizService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly categoryService: CategoryService,
  ) {}

  async create(createQuizDto: CreateQuizDto) {
    if (!createQuizDto.categoryId || !createQuizDto.title)
      throw new BadRequestException('The quiz object is invalid');

    const category = await this.categoryService.doesExist(
      createQuizDto.categoryId,
    );
    if (!category) throw new BadRequestException("The category doesn't exist");
    const newQuiz = await this.prisma.quiz.create({
      data: {
        title: createQuizDto.title,
        categoryId: createQuizDto.categoryId,
        questions: createQuizDto.questions
          ? {
              create: createQuizDto.questions.map((question) => ({
                text: question.text,
                type: question.type,
                answers: question.answers
                  ? {
                      create: question.answers.map((answer) => ({
                        text: answer.text,
                        isCorrect: answer.isCorrect,
                      })),
                    }
                  : undefined,
              })),
            }
          : undefined,
      },
    });

    return newQuiz;
  }

  async getAll() {
    const quizes = await this.prisma.quiz.findMany({
      include: {
        category: true,
      },
    });
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
    if (!quiz) throw new NotFoundException("The quiz doesn't exist");
    return QuizDetails.fromPrisma(quiz);
  }

  async doesExist(id: string) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id },
    });
    return quiz ? true : false;
  }

  async getByTitle(title: string) {
    const quizes = await this.prisma.quiz.findMany({
      where: {
        title: {
          contains: title,
          mode: 'insensitive',
        },
      },
      include: { category: true },
    });
    return quizes.map((q) => Quiz.fromPrisma(q));
  }

  async update(id: string, updateQuizDto: UpdateQuizDto) {
    const quiz = await this.getById(id);
    if (!quiz) throw new NotFoundException("The quiz doesn't exist");

    if (updateQuizDto.categoryId) {
      const category = await this.categoryService.doesExist(
        updateQuizDto.categoryId,
      );
      if (!category) throw new NotFoundException("The category doesn't exist");
    }

    return this.prisma.quiz.update({
      where: { id },
      data: {
        categoryId: updateQuizDto.categoryId,
        title: updateQuizDto.title,
      },
    });
  }

  async remove(id: string) {
    const quiz = await this.getById(id);
    if (!quiz) throw new NotFoundException("The quiz doesn't exist");
    return this.prisma.quiz.delete({ where: { id } });
  }
}
