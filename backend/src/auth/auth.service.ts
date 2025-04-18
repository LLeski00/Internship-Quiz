import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async register(registerDto: RegisterDto) {
    if (
      !registerDto.email ||
      !registerDto.firstName ||
      !registerDto.lastName ||
      !registerDto.password
    )
      throw new BadRequestException('Invalid register object');

    if (!this.isEmailValid(registerDto.email))
      throw new BadRequestException('The email is invalid');

    const user = await this.userService.getByEmail(registerDto.email);
    if (user) throw new BadRequestException('The email is already taken');

    if (!this.isPasswordValid(registerDto.password))
      throw new BadRequestException('The password is invalid');

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

  async login(loginDto: LoginDto) {
    const user = await this.userService.getByEmail(loginDto.email);
    if (!user) throw new BadRequestException("The email doesn't exist");
    const isPasswordValid = await compare(loginDto.password, user.password);

    if (!isPasswordValid) {
      throw new ForbiddenException('Password not valid');
    }

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  isEmailValid(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  isPasswordValid(password: string) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return passwordRegex.test(password);
  }
}
