import { ApiProperty } from '@nestjs/swagger';
import { Score as PrismaScore } from '@prisma/client';

export class Score {
  @ApiProperty({
    description: 'The unique identifier of the score record',
    type: String,
  })
  id: string;

  @ApiProperty({
    description: 'The user ID associated with the score',
    type: String,
  })
  userId: string;

  @ApiProperty({
    description: 'The ID of the quiz for which the score was recorded',
    type: String,
  })
  quizId: string;

  @ApiProperty({
    description: 'The time taken by the user to complete the quiz (in seconds)',
    type: Number,
  })
  time: number;

  @ApiProperty({
    description: 'The total points scored by the user in the quiz',
    type: Number,
  })
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
