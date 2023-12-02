import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as bcrypt from 'bcrypt';
import { Observable } from 'rxjs';
import { PrismaService } from '../../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<any | Observable<any>> {
    try {
      const user: User = await this.prisma.user.findUnique({
        where: {
          email: loginDto.email,
        },
      });
      if (!user) {
        throw new HttpException('Invalid email', HttpStatus.NOT_FOUND);
      }
      const { password, ...rest } = user;

      const isMatch = await bcrypt.compare(loginDto.password, password);

      if (isMatch) {
        const payload = {
          id: user.id,
          email: user.email,
        };
        return {
          user: rest,
          access_token: await this.jwtService.signAsync(payload),
        };
      }

      throw new HttpException('Authentication failure', HttpStatus.FORBIDDEN);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new HttpException(
          'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      throw error;
    }
  }

  async register(registerDto: RegisterDto): Promise<any | Observable<any>> {
    try {
      const existedUser: User = await this.prisma.user.findUnique({
        where: {
          email: registerDto.email,
        },
      });

      if (existedUser) {
        throw new HttpException('Email already in use!', HttpStatus.CONFLICT);
      }
      // if email not in database
      const saltOrRounds = parseInt(process.env.SCRYPT_SALT_OR_ROUNDS);
      const hash = await bcrypt.hash(registerDto.password, saltOrRounds);

      const user: User = await this.prisma.user.create({
        data: {
          ...registerDto,
          password: hash,
        },
      });

      if (user) {
        const payload = {
          id: user.id,
          email: user.email,
        };

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...rest } = user;

        return {
          user: rest,
          access_token: await this.jwtService.signAsync(payload),
        };
      }

      throw new HttpException('Register failure!', HttpStatus.BAD_REQUEST);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new HttpException(
          'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      throw error;
    }
  }
}
