import { ApiProperty } from '@nestjs/swagger';
import { Answer } from '../entities/answer.entity';

export class AnswerResponseDto {
  @ApiProperty({
    description: 'The unique identifier of the answer',
    type: String,
  })
  id: string;

  @ApiProperty({
    description: 'The unique identifier of the associated question',
    type: String,
  })
  questionId: string;

  @ApiProperty({
    description: 'The text content of the answer',
    type: String,
  })
  text: string;

  @ApiProperty({
    description: 'Indicates whether the answer is correct',
    type: Boolean,
  })
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
