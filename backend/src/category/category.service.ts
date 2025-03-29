import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return 'This action adds a new category';
  }

  async getAll() {
    const categories = await this.prisma.category.findMany();
    return categories.map((c) => Category.from(c));
  }

  async getById(id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });
    return Category.from(category);
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  async remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
