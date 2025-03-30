import { ApiProperty } from '@nestjs/swagger';
import { Answer as PrismaAnswer } from '@prisma/client';

export class Answer {
  @ApiProperty({
    description: 'The unique identifier of the answer',
    type: String,
  })
  id: string;

  @ApiProperty({
    description:
      'The unique identifier of the question this answer is related to',
    type: String,
  })
  questionId: string;

  @ApiProperty({
    description: 'The text content of the answer',
    type: String,
  })
  text: string;

  @ApiProperty({
    description: 'Indicates whether the answer is correct or not',
    type: Boolean,
  })
  isCorrect: boolean;

  constructor(
    id: string,
    questionId: string,
    text: string,
    isCorrect: boolean,
  ) {
    this.id = id;
    this.questionId = questionId;
    this.text = text;
    this.isCorrect = isCorrect;
  }

  static fromPrisma(prismaAnswer: PrismaAnswer | null) {
    if (prismaAnswer === null) return null;

    return new Answer(
      prismaAnswer.id,
      prismaAnswer.questionId,
      prismaAnswer.text,
      prismaAnswer.isCorrect,
    );
  }
}
