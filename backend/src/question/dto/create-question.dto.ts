import { QuestionType } from '@prisma/client';
import { CreateAnswerDto } from 'src/answer/dto/create-answer.dto';

export class CreateQuestionDto {
  id: string;
  quizId: string;
  text: string;
  type: QuestionType;
  answers: CreateAnswerDto[];
}
