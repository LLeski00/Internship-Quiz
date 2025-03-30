import { Module } from '@nestjs/common';
import { ScoreService } from './score.service';
import { ScoreController } from './score.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { QuizModule } from 'src/quiz/quiz.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [QuizModule, UserModule],
  controllers: [ScoreController],
  providers: [ScoreService, PrismaService],
})
export class ScoreModule {}
