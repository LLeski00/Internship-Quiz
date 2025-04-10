import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { QuestionType } from '@prisma/client';
import { Question } from '../entities/question.entity';

export class QuestionResponseDto {
  @ApiProperty({
    description: 'The unique identifier for the question',
    type: String,
  })
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    description: 'The ID of the quiz that this question belongs to',
    type: String,
  })
  @IsUUID()
  @IsNotEmpty()
  quizId: string;

  @ApiProperty({
    description: 'The text of the question',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty({
    description: 'The type of the question (e.g., multiple choice, true/false)',
    enum: QuestionType,
  })
  @IsEnum(QuestionType)
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
