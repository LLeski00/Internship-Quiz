import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Question } from './entities/question.entity';
import { CreateAnswerDto } from 'src/answer/dto/create-answer.dto';
import { QuizService } from 'src/quiz/quiz.service';

@Injectable()
export class QuestionService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly quizService: QuizService,
  ) {}

  async create(createQuestionDto: CreateQuestionDto) {
    const { answers, ...questionData } = createQuestionDto;

    if (!questionData.quizId || !questionData.text || !questionData.type)
      throw new BadRequestException('The question object is invalid');

    const quiz = await this.quizService.getById(questionData.quizId);
    if (!quiz) throw new NotFoundException("The quiz doesn't exist");

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
    if (!question) throw new NotFoundException("The question doesn't exist");
    return Question.fromPrisma(question);
  }

  async update(id: string, updateQuestionDto: UpdateQuestionDto) {
    const question = await this.getById(id);
    if (!question) throw new NotFoundException("The question doesn't exist");
    const { quizId, answers, ...questionData } = updateQuestionDto;

    return this.prisma.question.update({
      where: { id },
      data: {
        ...questionData,
      },
    });
  }

  async remove(id: string) {
    const question = await this.getById(id);
    if (!question) throw new NotFoundException("The question doesn't exist");
    return this.prisma.question.delete({ where: { id } });
  }
}
