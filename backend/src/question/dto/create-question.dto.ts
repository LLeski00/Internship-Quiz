import { ApiProperty } from '@nestjs/swagger';
import { QuestionType } from '@prisma/client';
import { CreateAnswerDto } from 'src/answer/dto/create-answer.dto';

export class CreateQuestionDto {
  @ApiProperty({
    description: 'The unique identifier for the question',
    type: String,
  })
  id: string;

  @ApiProperty({
    description: 'The ID of the quiz to which this question belongs',
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

  @ApiProperty({
    description: 'The list of possible answers for the question',
    type: [CreateAnswerDto],
  })
  answers: CreateAnswerDto[];
}
