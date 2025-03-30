import { ApiProperty } from '@nestjs/swagger';
import { Quiz } from '../entities/quiz.entity';

export class QuizResponseDto {
  @ApiProperty({
    description: 'The unique identifier of the quiz',
    type: String,
  })
  id: string;

  @ApiProperty({
    description: 'The title of the quiz',
    type: String,
  })
  title: string;

  @ApiProperty({
    description: 'The ID of the category this quiz belongs to',
    type: String,
  })
  categoryId: string;

  constructor(id: string, title: string, categoryId: string) {
    this.id = id;
    this.title = title;
    this.categoryId = categoryId;
  }

  static fromDomain(domainQuiz: Quiz | null) {
    if (domainQuiz === null) return null;

    return new QuizResponseDto(
      domainQuiz.id,
      domainQuiz.title,
      domainQuiz.categoryId,
    );
  }
}
