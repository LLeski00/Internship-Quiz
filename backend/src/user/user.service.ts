import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

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

    const newUser = await this.prisma.user.create({
      data: createUserDto,
    });

    return newUser;
  }

  async getAll() {
    const users = await this.prisma.user.findMany();
    return users.map((u) => User.fromPrisma(u));
  }

  async getById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) throw new NotFoundException("The user doesn't exist");
    return User.fromPrisma(user);
  }

  async getByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user) throw new NotFoundException("The user doesn't exist");
    return User.fromPrisma(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = this.getById(id);
    if (!user) throw new NotFoundException("The user doesn't exist");
    return this.prisma.user.update({ where: { id }, data: updateUserDto });
  }

  async remove(id: string) {
    const user = this.getById(id);
    if (!user) throw new NotFoundException("The user doesn't exist");
    return this.prisma.user.delete({ where: { id } });
  }
}
