import { ApiProperty } from '@nestjs/swagger';
import { Score } from '../entities/score.entity';

export class ScoreResponseDto {
  @ApiProperty({
    description: 'The unique identifier of the score record',
    type: String,
  })
  id: string;

  @ApiProperty({
    description: 'The ID of the user who completed the quiz',
    type: String,
  })
  userId: string;

  @ApiProperty({
    description: 'The ID of the quiz for which the score was recorded',
    type: String,
  })
  quizId: string;

  @ApiProperty({
    description: 'The total points scored by the user in the quiz',
    type: Number,
  })
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
