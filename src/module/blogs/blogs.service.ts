import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { Blog } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Observable } from 'rxjs';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
@Injectable()
export class BlogsService {
  constructor(private prisma: PrismaService) {}

  async create(createBlogDto: CreateBlogDto): Promise<Blog | Observable<Blog>> {
    try {
      const result: Blog = await this.prisma.blog.create({
        data: createBlogDto,
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

  async findAll(): Promise<Blog[] | Observable<Blog[]>> {
    try {
      const result: Blog[] = await this.prisma.blog.findMany();
      return result;
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number): Promise<Blog | Observable<Blog>> {
    try {
      const result: Blog = await this.prisma.blog.findUnique({
        where: { id },
      });

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
    updateBlogDto: UpdateBlogDto,
  ): Promise<Blog | Observable<Blog>> {
    try {
      const result: Blog = await this.prisma.blog.update({
        where: { id },
        data: updateBlogDto,
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

  async delete(id: number): Promise<Blog | Observable<Blog>> {
    try {
      const result: Blog = await this.prisma.blog.delete({ where: { id } });
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
}
