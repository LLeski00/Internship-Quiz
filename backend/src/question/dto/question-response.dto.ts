import { ApiProperty } from '@nestjs/swagger';
import { QuestionType } from '@prisma/client';
import { Question } from '../entities/question.entity';

export class QuestionResponseDto {
  @ApiProperty({
    description: 'The unique identifier for the question',
    type: String,
  })
  id: string;

  @ApiProperty({
    description: 'The ID of the quiz that this question belongs to',
    type: String,
  })
  quizId: string;

  @ApiProperty({
    description: 'The text of the question',
    type: String,
  })
  text: string;

  @ApiProperty({
    description: 'The type of the question (e.g., multiple choice, true/false)',
    enum: QuestionType,
  })
  type: QuestionType;

  constructor(id: string, quizId: string, text: string, type: QuestionType) {
    this.id = id;
    this.quizId = quizId;
    this.text = text;
    this.type = type;
  }

  static fromDomain(domainQuestion: Question | null) {
    if (domainQuestion === null) return null;

    return new QuestionResponseDto(
      domainQuestion.id,
      domainQuestion.quizId,
      domainQuestion.text,
      domainQuestion.type,
    );
  }
}
