import { ApiProperty } from '@nestjs/swagger';
import { Answer } from '../entities/answer.entity';
import { IsBoolean, IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class AnswerResponseDto {
  @ApiProperty({
    description: 'The unique identifier of the answer',
    type: String,
  })
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    description: 'The unique identifier of the associated question',
    type: String,
  })
  @IsUUID()
  @IsNotEmpty()
  questionId: string;

  @ApiProperty({
    description: 'The text content of the answer',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty({
    description: 'Indicates whether the answer is correct',
    type: Boolean,
  })
  @IsBoolean()
  isCorrect: boolean;

  constructor(
    id: string,
    questionId: string,
    text: string,
    isCorrect: boolean,
  ) {
    this.id = id;
    this.questionId = questionId;
    this.text = text;
    this.isCorrect = isCorrect;
  }

  static fromDomain(domainAnswer: Answer | null) {
    if (domainAnswer === null) return null;

    return new AnswerResponseDto(
      domainAnswer.id,
      domainAnswer.questionId,
      domainAnswer.text,
      domainAnswer.isCorrect,
    );
  }
}
