import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class UserResponseDto {
  @ApiProperty({
    description: 'The first name of the user',
    type: String,
  })
  firstName: string;

  @ApiProperty({
    description: 'The last name of the user',
    type: String,
  })
  lastName: string;

  @ApiProperty({
    description: 'The email of the user',
    type: String,
  })
  email: string;

  constructor(firstName: string, lastName: string, email: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }

  static fromPrisma(prismaUser: User | null) {
    if (prismaUser === null) return null;

    return new UserResponseDto(
      prismaUser.firstName,
      prismaUser.lastName,
      prismaUser.email,
    );
  }
}
