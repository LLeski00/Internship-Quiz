import { Quiz as PrismaQuiz } from '@prisma/client';

export class Quiz {
  id: string;
  title: string;
  categoryId: string;

  constructor(id: string, title: string, categoryId: string) {
    this.id = id;
    this.title = title;
    this.categoryId = categoryId;
  }

  static fromPrisma(prismaQuiz: PrismaQuiz | null) {
    if (prismaQuiz === null) return null;

    return new Quiz(prismaQuiz.id, prismaQuiz.title, prismaQuiz.categoryId);
  }
}
