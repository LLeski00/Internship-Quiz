import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsPositive } from 'class-validator';
import { Category, Score as PrismaScore, Quiz, User } from '@prisma/client';
import { UserResponseDto } from 'src/user/dto/user-response.dto';
import { QuizResponseDto } from 'src/quiz/dto/quiz-response.dto';

export class ScoreDetails {
  @ApiProperty({
    description: 'The unique identifier of the score record',
    type: String,
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: 'The user who completed the quiz, null if not available',
    type: UserResponseDto,
    nullable: true,
  })
  @IsOptional()
  user: UserResponseDto | null;

  @ApiProperty({
    description: 'The quiz that was completed, null if not available',
    type: QuizResponseDto,
    nullable: true,
  })
  @IsOptional()
  quiz: QuizResponseDto | null;

  @ApiProperty({
    description: 'The time taken by the user to complete the quiz (in seconds)',
    type: Number,
  })
  @IsNumber()
  @IsPositive()
  time: number;

  @ApiProperty({
    description: 'The total points scored by the user in the quiz',
    type: Number,
  })
  @IsNumber()
  @IsPositive()
  points: number;

  constructor(
    id: string,
    user: UserResponseDto | null,
    quiz: QuizResponseDto | null,
    time: number,
    points: number,
  ) {
    this.id = id;
    this.user = user;
    this.quiz = quiz;
    this.time = time;
    this.points = points;
  }

  static fromPrisma(
    prismaScoreDetails:
      | (PrismaScore & {
          user: User | null;
          quiz: (Quiz & { category: Category }) | null;
        })
      | null,
  ) {
    if (prismaScoreDetails === null) return null;

    return new ScoreDetails(
      prismaScoreDetails.id,
      UserResponseDto.fromPrisma(prismaScoreDetails.user),
      QuizResponseDto.fromPrisma(prismaScoreDetails.quiz),
      prismaScoreDetails.time,
      prismaScoreDetails.points,
    );
  }
}
