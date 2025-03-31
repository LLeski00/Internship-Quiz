import { Category, Quiz as PrismaQuiz } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Quiz {
  @ApiProperty({ description: 'Unique identifier for the quiz' })
  id: string;

  @ApiProperty({ description: 'Title of the quiz' })
  title: string;

  @ApiPropertyOptional({ description: 'Category of the quiz' })
  category?: Category;

  constructor(id: string, title: string, category?: Category) {
    this.id = id;
    this.title = title;
    this.category = category;
  }

  static fromPrisma(
    prismaQuiz: (PrismaQuiz & { category: Category | undefined }) | null,
  ) {
    if (prismaQuiz === null) return null;

    return new Quiz(prismaQuiz.id, prismaQuiz.title, prismaQuiz.category);
  }
}
