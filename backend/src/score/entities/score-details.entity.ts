import { Score as PrismaScore, User } from '@prisma/client';
import { UserResponseDto } from 'src/user/dto/user-response.dto';

export class ScoreDetails {
  id: string;
  user: UserResponseDto | null;
  quizId: string;
  time: number;
  points: number;

  constructor(
    id: string,
    user: UserResponseDto | null,
    quizId: string,
    time: number,
    points: number,
  ) {
    this.id = id;
    this.user = user;
    this.quizId = quizId;
    this.time = time;
    this.points = points;
  }

  static fromPrisma(
    prismaScoreDetails: (PrismaScore & { user: User | null }) | null,
  ) {
    if (prismaScoreDetails === null) return null;

    return new ScoreDetails(
      prismaScoreDetails.id,
      UserResponseDto.fromPrisma(prismaScoreDetails.user),
      prismaScoreDetails.quizId,
      prismaScoreDetails.time,
      prismaScoreDetails.points,
    );
  }
}
