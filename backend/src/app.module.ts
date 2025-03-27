import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuizModule } from './quiz/quiz.module';
import { QuestionModule } from './question/question.module';

@Module({
  imports: [QuizModule, QuestionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
