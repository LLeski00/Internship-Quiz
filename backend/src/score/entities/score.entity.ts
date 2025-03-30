import { Score as PrismaScore } from '@prisma/client';

export class Score {
  id: string;
  userId: string;
  quizId: string;
  time: number;
  points: number;

  constructor(
    id: string,
    userId: string,
    quizId: string,
    time: number,
    points: number,
  ) {
    this.id = id;
    this.userId = userId;
    this.quizId = quizId;
    this.time = time;
    this.points = points;
  }

  static fromPrisma(prismaScore: PrismaScore | null) {
    if (prismaScore === null) return null;

    return new Score(
      prismaScore.id,
      prismaScore.userId,
      prismaScore.quizId,
      prismaScore.time,
      prismaScore.points,
    );
  }
}
