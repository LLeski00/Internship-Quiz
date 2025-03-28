import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuizModule } from './quiz/quiz.module';
import { QuestionModule } from './question/question.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { AnswerModule } from './answer/answer.module';
import { ScoreModule } from './score/score.module';

@Module({
  imports: [QuizModule, QuestionModule, PrismaModule, UserModule, CategoryModule, AnswerModule, ScoreModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
