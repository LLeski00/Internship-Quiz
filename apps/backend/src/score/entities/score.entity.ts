import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsPositive } from 'class-validator';
import { Score as PrismaScore } from '@prisma/client';

export class Score {
  @ApiProperty({
    description: 'The unique identifier of the score record',
    type: String,
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: 'The user ID associated with the score',
    type: String,
  })
  @IsString()
  userId: string;

  @ApiProperty({
    description: 'The ID of the quiz for which the score was recorded',
    type: String,
  })
  @IsString()
  quizId: string;

  @ApiProperty({
    description: 'The time taken by the user to complete the quiz (in seconds)',
    type: Number,
  })
  @IsNumber()
  @IsPositive()
  time: number;

  @ApiProperty({
    description: 'Users score in the quiz',
    type: Number,
  })
  @IsNumber()
  @IsPositive()
  score: number;

  constructor(
    id: string,
    userId: string,
    quizId: string,
    time: number,
    score: number,
  ) {
    this.id = id;
    this.userId = userId;
    this.quizId = quizId;
    this.time = time;
    this.score = score;
  }

  static fromPrisma(prismaScore: PrismaScore | null) {
    if (prismaScore === null) return null;

    return new Score(
      prismaScore.id,
      prismaScore.userId,
      prismaScore.quizId,
      prismaScore.time,
      prismaScore.score,
    );
  }
}
