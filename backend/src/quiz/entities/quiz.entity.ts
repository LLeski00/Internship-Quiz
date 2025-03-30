import { Quiz as PrismaQuiz } from '@prisma/client';

export class Quiz {
  id: string;
  title: string;
  categoryId: string;
  category?: string;
  questions?: any[];

  constructor(
    id: string,
    title: string,
    categoryId: string,
    category?: string,
    questions?: any[],
  ) {
    this.id = id;
    this.title = title;
    this.categoryId = categoryId;
    this.category = category;
    this.questions = questions;
  }

  static fromPrisma(prismaQuiz: PrismaQuiz | null) {
    if (prismaQuiz === null) return null;

    return new Quiz(prismaQuiz.id, prismaQuiz.title, prismaQuiz.categoryId);
  }
}
