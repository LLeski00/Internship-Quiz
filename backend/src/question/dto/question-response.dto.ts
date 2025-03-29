import { QuestionType } from '@prisma/client';
import { Question } from '../entities/question.entity';

export class QuestionResponseDto {
  id: string;
  quizId: string;
  text: string;
  type: QuestionType;

  constructor(id: string, quizId: string, text: string, type: QuestionType) {
    this.id = id;
    this.quizId = quizId;
    this.text = text;
    this.type = type;
  }

  static from(domainQuestion: Question | null) {
    if (domainQuestion === null) return null;

    return new QuestionResponseDto(
      domainQuestion.id,
      domainQuestion.quizId,
      domainQuestion.text,
      domainQuestion.type,
    );
  }
}
