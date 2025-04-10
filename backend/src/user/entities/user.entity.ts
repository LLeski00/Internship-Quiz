import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsEnum } from 'class-validator';
import { User as PrismaUser, UserRole } from '@prisma/client';

export class User {
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
    description: 'The hashed password of the user',
    type: String,
  })
  @IsString()
  password: string;

  @ApiProperty({
    description: 'The role assigned to the user (e.g., ADMIN, USER)',
    enum: UserRole,
  })
  @IsEnum(UserRole)
  role: UserRole;

  constructor(
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: UserRole,
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.role = role;
  }

  static fromPrisma(prismaUser: PrismaUser | null) {
    if (prismaUser === null) return null;

    return new User(
      prismaUser.id,
      prismaUser.firstName,
      prismaUser.lastName,
      prismaUser.email,
      prismaUser.password,
      prismaUser.role,
    );
  }
}
