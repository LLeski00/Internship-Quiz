import { Answer } from '../entities/answer.entity';

export class AnswerResponseDto {
  id: string;
  questionId: string;
  text: string;
  isCorrect: boolean;

  constructor(
    id: string,
    questionId: string,
    text: string,
    isCorrect: boolean,
  ) {
    this.id = id;
    this.questionId = questionId;
    this.text = text;
    this.isCorrect = isCorrect;
  }

  static fromDomain(domainAnswer: Answer | null) {
    if (domainAnswer === null) return null;

    return new AnswerResponseDto(
      domainAnswer.id,
      domainAnswer.questionId,
      domainAnswer.text,
      domainAnswer.isCorrect,
    );
  }
}
