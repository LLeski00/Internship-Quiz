import { Injectable } from '@nestjs/common';
import { CreateScoreDto } from './dto/create-score.dto';
import { UpdateScoreDto } from './dto/update-score.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ScoreService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createScoreDto: CreateScoreDto) {
    return 'This action adds a new score';
  }

  async findAll() {
    return this.prisma.score.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.score.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateScoreDto: UpdateScoreDto) {
    return `This action updates a #${id} score`;
  }

  async remove(id: number) {
    return `This action removes a #${id} score`;
  }
}
