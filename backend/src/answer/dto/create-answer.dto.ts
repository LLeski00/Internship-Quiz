import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class CreateAnswerDto {
  @ApiProperty({
    description:
      'The unique identifier of the question to which the answer belongs',
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
}
