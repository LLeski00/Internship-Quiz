import { UserRole } from '@prisma/client';
import { User } from '../entities/user.entity';

export class UserResponseDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
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

  static fromDomain(domainUser: User | null) {
    if (domainUser === null) return null;

    return new UserResponseDto(
      domainUser.id,
      domainUser.firstName,
      domainUser.lastName,
      domainUser.email,
      domainUser.password,
      domainUser.role,
    );
  }
}
