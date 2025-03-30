import { ApiProperty } from '@nestjs/swagger';

export class CreateAnswerDto {
  @ApiProperty({
    description:
      'The unique identifier of the question to which the answer belongs',
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
}
