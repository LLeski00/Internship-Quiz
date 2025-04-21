import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsEnum,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { User as PrismaUser, UserRole } from '@prisma/client';
import { Type } from 'class-transformer';
import { ScoreDetails } from 'src/score/entities/score-details.entity';

export class UserDetails {
  @ApiProperty({
    description: 'The unique identifier of the user',
    type: String,
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: 'The first name of the user',
    type: String,
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    description: 'The last name of the user',
    type: String,
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    description: 'The email address of the user',
    type: String,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The role assigned to the user (e.g., ADMIN, USER)',
    enum: UserRole,
  })
  @IsEnum(UserRole)
  role: UserRole;

  @ApiProperty({
    description: 'List of questions in the quiz',
    type: [ScoreDetails],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ScoreDetails)
  scores: ScoreDetails[];

  constructor(
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    role: UserRole,
    scores: ScoreDetails[],
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.role = role;
    this.scores = scores;
  }

  static fromPrisma(
    prismaUser:
      | (PrismaUser & {
          scores: ScoreDetails[];
        })
      | null,
  ) {
    if (prismaUser === null) return null;

    return new UserDetails(
      prismaUser.id,
      prismaUser.firstName,
      prismaUser.lastName,
      prismaUser.email,
      prismaUser.role,
      prismaUser.scores,
    );
  }
}
