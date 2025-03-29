import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async getAll() {
    const users = await this.prisma.user.findMany();
    return users.map((u) => User.from(u));
  }

  async getById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    return User.from(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
