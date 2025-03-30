import { Answer as PrismaAnswer } from '@prisma/client';

export class Answer {
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

  static fromPrisma(prismaAnswer: PrismaAnswer | null) {
    if (prismaAnswer === null) return null;

    return new Answer(
      prismaAnswer.id,
      prismaAnswer.questionId,
      prismaAnswer.text,
      prismaAnswer.isCorrect,
    );
  }
}
