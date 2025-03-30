import { ApiProperty } from '@nestjs/swagger';
import { Question as PrismaQuestion, QuestionType } from '@prisma/client';

export class Question {
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

  constructor(id: string, quizId: string, text: string, type: QuestionType) {
    this.id = id;
    this.quizId = quizId;
    this.text = text;
    this.type = type;
  }

  static fromPrisma(prismaQuestion: PrismaQuestion | null) {
    if (prismaQuestion === null) return null;

    return new Question(
      prismaQuestion.id,
      prismaQuestion.quizId,
      prismaQuestion.text,
      prismaQuestion.type,
    );
  }
}
