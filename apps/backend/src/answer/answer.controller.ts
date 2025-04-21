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
import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { AdminAuthGuard } from 'src/auth/admin-auth.guard';

@Controller('answer')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Post()
  @UseGuards(AdminAuthGuard)
  create(@Body() createAnswerDto: CreateAnswerDto) {
    return this.answerService.create(createAnswerDto);
  }

  @Get()
  @UseGuards(AdminAuthGuard)
  findAll() {
    return this.answerService.getAll();
  }

  @Get(':id')
  @UseGuards(AdminAuthGuard)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.answerService.getById(id);
  }

  @Patch(':id')
  @UseGuards(AdminAuthGuard)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAnswerDto: UpdateAnswerDto,
  ) {
    return this.answerService.update(id, updateAnswerDto);
  }

  @Delete(':id')
  @UseGuards(AdminAuthGuard)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.answerService.remove(id);
  }
}
