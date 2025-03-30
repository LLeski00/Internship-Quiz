import { Score as PrismaScore } from '@prisma/client';

export class Score {
  id: string;
  userId: string;
  quizId: string;
  points: number;

  constructor(id: string, userId: string, quizId: string, points: number) {
    this.id = id;
    this.userId = userId;
    this.quizId = quizId;
    this.points = points;
  }

  static fromPrisma(prismaScore: PrismaScore | null) {
    if (prismaScore === null) return null;

    return new Score(
      prismaScore.id,
      prismaScore.userId,
      prismaScore.quizId,
      prismaScore.points,
    );
  }
}
