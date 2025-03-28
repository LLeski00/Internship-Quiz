import { Injectable } from '@nestjs/common';
import { CreateScoreDto } from './dto/create-score.dto';
import { UpdateScoreDto } from './dto/update-score.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ScoreService {
  constructor(private readonly prisma: PrismaService) {}

  create(createScoreDto: CreateScoreDto) {
    return 'This action adds a new score';
  }

  findAll() {
    return `This action returns all score`;
  }

  findOne(id: number) {
    return `This action returns a #${id} score`;
  }

  update(id: number, updateScoreDto: UpdateScoreDto) {
    return `This action updates a #${id} score`;
  }

  remove(id: number) {
    return `This action removes a #${id} score`;
  }
}
