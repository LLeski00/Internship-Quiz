import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { QuizService } from 'src/quiz/quiz.service';
import { QuizModule } from 'src/quiz/quiz.module';

@Module({
  imports: [QuizModule],
  controllers: [QuestionController],
  providers: [QuestionService, PrismaService],
  exports: [QuestionService],
})
export class QuestionModule {}
