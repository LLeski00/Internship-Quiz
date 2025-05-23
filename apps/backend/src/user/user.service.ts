import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDetails } from './entities/user-details.entity';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    if (
      !createUserDto.email ||
      !createUserDto.firstName ||
      !createUserDto.lastName ||
      !createUserDto.password ||
      !createUserDto.role
    )
      throw new BadRequestException('The user object is invalid');

    const user = await this.getByEmail(createUserDto.email);
    if (user) throw new BadRequestException('The email already exists');

    const newUser = await this.prisma.user.create({
      data: {
        email: createUserDto.email,
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        password: createUserDto.password,
        role: createUserDto.role,
      },
    });

    return newUser;
  }

  async getAll() {
    const users = await this.prisma.user.findMany();
    return users.map((u) => User.fromPrisma(u));
  }

  async getAllWithScores() {
    const users = await this.prisma.user.findMany({
      include: {
        scores: {
          include: {
            user: true,
            quiz: {
              include: {
                category: true,
              },
            },
          },
        },
      },
    });
    return users.map((u) => UserDetails.fromPrisma(u));
  }

  async getById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) throw new NotFoundException("The user doesn't exist");
    return User.fromPrisma(user);
  }

  async doesExist(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    return user ? true : false;
  }

  async getByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    return User.fromPrisma(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.getById(id);
    if (!user) throw new NotFoundException("The user doesn't exist");

    if (updateUserDto.email) {
      const email = await this.getByEmail(updateUserDto.email);
      if (email) throw new BadRequestException('The email already exists');
    }

    return this.prisma.user.update({
      where: { id },
      data: {
        email: updateUserDto.email,
        firstName: updateUserDto.firstName,
        lastName: updateUserDto.lastName,
        password: updateUserDto.password,
        role: updateUserDto.role,
      },
    });
  }

  async remove(id: string) {
    const user = await this.getById(id);
    if (!user) throw new NotFoundException("The user doesn't exist");
    return this.prisma.user.delete({ where: { id } });
  }
}
