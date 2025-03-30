import { ApiProperty } from '@nestjs/swagger';
import { Category } from 'src/category/entities/category.entity';
import { Question } from 'src/question/entities/question.entity';
import { Score } from 'src/score/entities/score.entity';
import { Quiz as PrismaQuiz } from '@prisma/client';

export class QuizDetails {
  @ApiProperty({
    description: 'The unique identifier of the quiz',
    type: String,
  })
  id: string;

  @ApiProperty({
    description: 'The title of the quiz',
    type: String,
  })
  title: string;

  @ApiProperty({
    description: 'The category of the quiz',
    type: Category,
  })
  category: Category;

  @ApiProperty({
    description: 'List of questions in the quiz',
    type: [Question],
  })
  questions: Question[];

  @ApiProperty({
    description: 'List of scores associated with the quiz',
    type: [Score],
  })
  scores: Score[];

  constructor(
    id: string,
    title: string,
    category: Category,
    questions: Question[],
    scores: Score[],
  ) {
    this.id = id;
    this.title = title;
    this.category = category;
    this.questions = questions;
    this.scores = scores;
  }

  static fromPrisma(
    prismaQuiz:
      | (PrismaQuiz & {
          category: Category;
          questions: Question[];
          scores: Score[];
        })
      | null,
  ) {
    if (prismaQuiz === null) return null;

    return new QuizDetails(
      prismaQuiz.id,
      prismaQuiz.title,
      prismaQuiz.category,
      prismaQuiz.questions,
      prismaQuiz.scores,
    );
  }
}
