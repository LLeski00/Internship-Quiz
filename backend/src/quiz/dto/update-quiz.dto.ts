import { ApiPropertyOptional } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateQuizDto } from './create-quiz.dto';
import { CreateQuestionDto } from 'src/question/dto/create-question.dto';

export class UpdateQuizDto extends PartialType(CreateQuizDto) {
  @ApiPropertyOptional({
    description:
      'A list of questions associated with the quiz. Optional field.',
    type: [CreateQuestionDto],
    isArray: true,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionDto)
  questions?: CreateQuestionDto[];
}
