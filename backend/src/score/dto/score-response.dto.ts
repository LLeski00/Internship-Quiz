import { Score } from '../entities/score.entity';

export class ScoreResponseDto {
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
