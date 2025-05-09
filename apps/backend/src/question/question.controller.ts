import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { AdminAuthGuard } from 'src/auth/admin-auth.guard';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  @UseGuards(AdminAuthGuard)
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionService.create(createQuestionDto);
  }

  @Get()
  @UseGuards(AdminAuthGuard)
  findAll() {
    return this.questionService.getAll();
  }

  @Get(':id')
  @UseGuards(AdminAuthGuard)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.questionService.getById(id);
  }

  @Patch(':id')
  @UseGuards(AdminAuthGuard)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.questionService.update(id, updateQuestionDto);
  }

  @Delete(':id')
  @UseGuards(AdminAuthGuard)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.questionService.remove(id);
  }
}
