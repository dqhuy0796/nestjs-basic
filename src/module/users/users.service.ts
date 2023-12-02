import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Observable } from 'rxjs';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User | Observable<User>> {
    try {
      const result: User = await this.prisma.user.create({
        data: createUserDto,
      });
      if (result) {
        return result;
      }
      throw new HttpException('Create failure', HttpStatus.BAD_REQUEST);
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

  async findAll(): Promise<User[] | Observable<User[]>> {
    try {
      const result: User[] = await this.prisma.user.findMany();
      return result;
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number): Promise<User | Observable<User>> {
    try {
      const result: User = await this.prisma.user.findUnique({ where: { id } });
      if (result) {
        return result;
      }
      throw new HttpException('File not found', HttpStatus.NOT_FOUND);
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

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<User | Observable<User>> {
    try {
      const result: User = await this.prisma.user.update({
        where: { id },
        data: updateUserDto,
      });
      if (result) {
        return result;
      }
      throw new HttpException('Update failure', HttpStatus.BAD_REQUEST);
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

  async delete(id: number): Promise<User | Observable<User>> {
    try {
      const result = await this.prisma.user.delete({ where: { id } });
      if (result) {
        return result;
      }
      throw new HttpException('Delete failure', HttpStatus.BAD_REQUEST);
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

  async deleteAll(): Promise<boolean | Observable<boolean>> {
    try {
      const result = await this.prisma.user.deleteMany();
      if (result) {
        return true;
      }
      throw new HttpException('Delete failure', HttpStatus.BAD_REQUEST);
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
