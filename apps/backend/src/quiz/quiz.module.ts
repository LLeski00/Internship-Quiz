import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoryService } from 'src/category/category.service';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports: [CategoryModule],
  controllers: [QuizController],
  providers: [QuizService, PrismaService],
  exports: [QuizService],
})
export class QuizModule {}
