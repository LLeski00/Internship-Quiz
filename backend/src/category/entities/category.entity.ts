import { Category as PrismaCategory } from '@prisma/client';

export class Category {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  static from(prismaCategory: PrismaCategory | null) {
    if (prismaCategory === null) return null;

    return new Category(prismaCategory.id, prismaCategory.name);
  }
}
