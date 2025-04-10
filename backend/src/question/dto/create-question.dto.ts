import { ApiProperty } from '@nestjs/swagger';
import { QuestionType } from '@prisma/client';
import {
  IsUUID,
  IsNotEmpty,
  IsString,
  IsEnum,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateAnswerDto } from 'src/answer/dto/create-answer.dto';

export class CreateQuestionDto {
  @ApiProperty({
    description: 'The ID of the quiz to which this question belongs',
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

  @ApiProperty({
    description: 'The list of possible answers for the question',
    type: [CreateAnswerDto],
  })
  @ValidateNested({ each: true })
  @Type(() => CreateAnswerDto)
  answers: CreateAnswerDto[];
}
