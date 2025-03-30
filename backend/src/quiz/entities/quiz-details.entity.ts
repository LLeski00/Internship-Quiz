import { Category, Quiz as PrismaQuiz, Question, Score } from '@prisma/client';

export class QuizDetails {
  id: string;
  title: string;
  category: Category;
  questions: Question[];
  scores: Score[];

  constructor(
    id: string,
    title: string,
    category: Category,
    questions: Question[],
    scores: Score[],
  ) {
    this.id = id;
    this.title = title;
    this.category = category;
    this.questions = questions;
    this.scores = scores;
  }

  static fromPrisma(
    prismaQuiz:
      | (PrismaQuiz & {
          category: Category;
          questions: Question[];
          scores: Score[];
        })
      | null,
  ) {
    if (prismaQuiz === null) return null;

    return new QuizDetails(
      prismaQuiz.id,
      prismaQuiz.title,
      prismaQuiz.category,
      prismaQuiz.questions,
      prismaQuiz.scores,
    );
  }
}
