import { Injectable } from '@nestjs/common';
import { CreateScoreDto } from './dto/create-score.dto';
import { UpdateScoreDto } from './dto/update-score.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Score } from './entities/score.entity';

@Injectable()
export class ScoreService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createScoreDto: CreateScoreDto) {
    return 'This action adds a new score';
  }

  async getAll() {
    const scores = await this.prisma.score.findMany();
    return scores.map((s) => Score.fromPrisma(s));
  }

  async getById(id: string) {
    const score = await this.prisma.score.findUnique({
      where: { id },
    });
    return Score.fromPrisma(score);
  }

  async update(id: number, updateScoreDto: UpdateScoreDto) {
    return `This action updates a #${id} score`;
  }

  async remove(id: number) {
    return `This action removes a #${id} score`;
  }
}
