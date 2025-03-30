import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from './entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from '@prisma/client';
import { compare, hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const user = await this.getByEmail(registerDto.email);
    if (user) throw new BadRequestException('The email is already taken');

    const hashedPassword = await hash(registerDto.password, 10);

    const newUser = await this.prisma.user.create({
      data: {
        email: registerDto.email,
        password: hashedPassword,
        firstName: registerDto.firstName,
        lastName: registerDto.lastName,
      },
    });

    const payload = {
      id: newUser.id,
      email: newUser.email,
      role: UserRole.USER,
    };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  async getAll() {
    const users = await this.prisma.user.findMany();
    return users.map((u) => User.fromPrisma(u));
  }

  async getById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    return User.fromPrisma(user);
  }

  async getByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    return User.fromPrisma(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
