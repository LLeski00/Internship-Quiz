import { Quiz } from '../entities/quiz.entity';

export class QuizResponseDto {
  id: string;
  title: string;
  categoryId: string;

  constructor(id: string, title: string, categoryId: string) {
    this.id = id;
    this.title = title;
    this.categoryId = categoryId;
  }

  static from(domainQuiz: Quiz | null) {
    if (domainQuiz === null) return null;

    return new QuizResponseDto(
      domainQuiz.id,
      domainQuiz.title,
      domainQuiz.categoryId,
    );
  }
}
