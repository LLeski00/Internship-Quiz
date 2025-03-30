import { PartialType } from '@nestjs/mapped-types';
import { CreateQuizDto } from './create-quiz.dto';
import { CreateQuestionDto } from 'src/question/dto/create-question.dto';

export class UpdateQuizDto extends PartialType(CreateQuizDto) {
  questions?: CreateQuestionDto[];
}
