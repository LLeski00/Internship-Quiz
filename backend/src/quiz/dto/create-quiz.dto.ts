import { ApiProperty } from '@nestjs/swagger';
import { CreateQuestionDto } from 'src/question/dto/create-question.dto';

export class CreateQuizDto {
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

  @ApiProperty({
    description: 'List of questions associated with the quiz',
    type: [CreateQuestionDto],
  })
  questions: CreateQuestionDto[];
}
