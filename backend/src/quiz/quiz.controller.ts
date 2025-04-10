import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { AdminAuthGuard } from 'src/auth/admin-auth.guard';
import { UserAuthGuard } from 'src/auth/user-auth.guard';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post()
  @UseGuards(AdminAuthGuard)
  create(@Body() createQuizDto: CreateQuizDto) {
    return this.quizService.create(createQuizDto);
  }

  @Get()
  async findAll(@Query('search') title?: string) {
    return title
      ? this.quizService.getByTitle(title)
      : this.quizService.getAll();
  }

  @Get(':id')
  @UseGuards(UserAuthGuard)
  findOne(@Param('id') id: string) {
    return this.quizService.getById(id);
  }

  @Patch(':id')
  @UseGuards(AdminAuthGuard)
  update(@Param('id') id: string, @Body() updateQuizDto: UpdateQuizDto) {
    return this.quizService.update(id, updateQuizDto);
  }

  @Delete(':id')
  @UseGuards(AdminAuthGuard)
  remove(@Param('id') id: string) {
    return this.quizService.remove(id);
  }
}
