import { Category, Quiz as PrismaQuiz } from '@prisma/client';

export class Quiz {
  id: string;
  title: string;
  category?: Category;

  constructor(id: string, title: string, category?: Category) {
    this.id = id;
    this.title = title;
    this.category = category;
  }

  static fromPrisma(
    prismaQuiz: (PrismaQuiz & { category: Category | undefined }) | null,
  ) {
    if (prismaQuiz === null) return null;

    return new Quiz(prismaQuiz.id, prismaQuiz.title, prismaQuiz.category);
  }
}
