import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Question } from './entities/question.entity';
import { CreateAnswerDto } from 'src/answer/dto/create-answer.dto';

@Injectable()
export class QuestionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createQuestionDto: CreateQuestionDto) {
    const { answers, ...questionData } = createQuestionDto;

    const newQuestion = await this.prisma.question.create({
      data: {
        ...questionData,
        answers: answers
          ? {
              create: answers.map((answer: CreateAnswerDto) => ({
                text: answer.text,
                isCorrect: answer.isCorrect,
              })),
            }
          : undefined,
      },
    });

    return newQuestion;
  }

  async getAll() {
    const questions = await this.prisma.question.findMany();
    return questions.map((q) => Question.fromPrisma(q));
  }

  async getById(id: string) {
    const question = await this.prisma.question.findUnique({
      where: { id },
    });
    return Question.fromPrisma(question);
  }

  async update(id: string, updateQuestionDto: UpdateQuestionDto) {
    const { quizId, answers, ...questionData } = updateQuestionDto;

    return this.prisma.question.update({
      where: { id },
      data: {
        ...questionData,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.question.delete({ where: { id } });
  }
}
