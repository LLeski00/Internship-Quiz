import { Category, Quiz as PrismaQuiz } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class Quiz {
  @ApiProperty({ description: 'Unique identifier for the quiz' })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ description: 'Title of the quiz' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({ description: 'Category of the quiz' })
  @IsOptional()
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
