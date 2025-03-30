import { ApiProperty } from '@nestjs/swagger';

export class CreateScoreDto {
  @ApiProperty({
    description: 'The ID of the user who took the quiz',
    type: String,
  })
  userId: string;

  @ApiProperty({
    description: 'The ID of the quiz taken by the user',
    type: String,
  })
  quizId: string;

  @ApiProperty({
    description: 'The time taken by the user to complete the quiz (in seconds)',
    type: Number,
  })
  time: number;

  @ApiProperty({
    description: 'The total points scored by the user in the quiz',
    type: Number,
  })
  points: number;
}
