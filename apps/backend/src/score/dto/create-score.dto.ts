import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsPositive, Min } from 'class-validator';

export class CreateScoreDto {
  @ApiProperty({
    description: 'The ID of the user who took the quiz',
    type: String,
  })
  @IsString()
  userId: string;

  @ApiProperty({
    description: 'The ID of the quiz taken by the user',
    type: String,
  })
  @IsString()
  quizId: string;

  @ApiProperty({
    description: 'The time taken by the user to complete the quiz (in seconds)',
    type: Number,
  })
  @IsNumber()
  @IsPositive()
  time: number;

  @ApiProperty({
    description: 'Users score in the quiz',
    type: Number,
  })
  @IsNumber()
  @Min(0)
  score: number;
}
