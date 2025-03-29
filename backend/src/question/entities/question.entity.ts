import { Question as PrismaQuestion, QuestionType } from '@prisma/client';

export class Question {
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

  static from(prismaQuestion: PrismaQuestion | null) {
    if (prismaQuestion === null) return null;

    return new Question(
      prismaQuestion.id,
      prismaQuestion.quizId,
      prismaQuestion.text,
      prismaQuestion.type,
    );
  }
}
