import { CreateQuestionDto } from 'src/question/dto/create-question.dto';

export class CreateQuizDto {
  title: string;
  categoryId: string;
  questions: CreateQuestionDto[];
}
