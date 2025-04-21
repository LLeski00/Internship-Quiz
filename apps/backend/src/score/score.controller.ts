import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ScoreService } from './score.service';
import { CreateScoreDto } from './dto/create-score.dto';
import { UpdateScoreDto } from './dto/update-score.dto';
import { AdminAuthGuard } from 'src/auth/admin-auth.guard';
import { UserAuthGuard } from 'src/auth/user-auth.guard';

@Controller('score')
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}

  @Post()
  @UseGuards(UserAuthGuard)
  create(@Body() createScoreDto: CreateScoreDto) {
    return this.scoreService.create(createScoreDto);
  }

  @Get()
  @UseGuards(UserAuthGuard)
  findAll(@Query('quizId') quizId?: string) {
    return quizId
      ? this.scoreService.getByQuizId(quizId)
      : this.scoreService.getAll();
  }

  @Get(':id')
  @UseGuards(UserAuthGuard)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.scoreService.getById(id);
  }

  @Patch(':id')
  @UseGuards(AdminAuthGuard)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateScoreDto: UpdateScoreDto,
  ) {
    return this.scoreService.update(id, updateScoreDto);
  }

  @Delete(':id')
  @UseGuards(AdminAuthGuard)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.scoreService.remove(id);
  }
}
