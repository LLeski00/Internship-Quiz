import { Module } from '@nestjs/common';
import { AnswerController } from './answer.controller';
import { QuestionModule } from 'src/question/question.module';
import { AnswerService } from './answer.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [QuestionModule],
  controllers: [AnswerController],
  providers: [AnswerService, PrismaService],
})
export class AnswerModule {}
