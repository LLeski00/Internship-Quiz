import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    if (!createCategoryDto.name)
      throw new BadRequestException('Missing name of category');

    const newCategory = await this.prisma.category.create({
      data: {
        name: createCategoryDto.name,
      },
    });
    return newCategory;
  }

  async getAll() {
    const categories = await this.prisma.category.findMany();
    return categories.map((c) => Category.fromPrisma(c));
  }

  async getById(id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });
    if (!category) throw new NotFoundException("The category doesn't exist");
    return Category.fromPrisma(category);
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.getById(id);
    if (!category) throw new NotFoundException("The category doesn't exist");
    return this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
    });
  }

  async remove(id: string) {
    const category = await this.getById(id);
    if (!category) throw new NotFoundException("The category doesn't exist");
    return this.prisma.category.delete({ where: { id } });
  }
}
