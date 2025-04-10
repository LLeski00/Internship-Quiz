import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsPositive } from 'class-validator';
import { Score } from '../entities/score.entity';

export class ScoreResponseDto {
  @ApiProperty({
    description: 'The unique identifier of the score record',
    type: String,
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: 'The ID of the user who completed the quiz',
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
    description: 'The total points scored by the user in the quiz',
    type: Number,
  })
  @IsNumber()
  @IsPositive()
  points: number;

  constructor(id: string, userId: string, quizId: string, points: number) {
    this.id = id;
    this.userId = userId;
    this.quizId = quizId;
    this.points = points;
  }

  static fromDomain(domainScore: Score | null) {
    if (domainScore === null) return null;

    return new ScoreResponseDto(
      domainScore.id,
      domainScore.userId,
      domainScore.quizId,
      domainScore.points,
    );
  }
}
