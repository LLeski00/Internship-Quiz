import { ApiProperty } from '@nestjs/swagger';
import { Category as PrismaCategory } from '@prisma/client';

export class Category {
  @ApiProperty({
    description: 'The unique identifier of the category',
    type: String,
  })
  id: string;

  @ApiProperty({
    description: 'The name of the category',
    type: String,
  })
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  static fromPrisma(prismaCategory: PrismaCategory | null) {
    if (prismaCategory === null) return null;

    return new Category(prismaCategory.id, prismaCategory.name);
  }
}
