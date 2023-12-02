import { Module, forwardRef } from '@nestjs/common';
import { BlogsController } from './blogs.controller';
import { BlogsService } from './blogs.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [BlogsController],
  providers: [BlogsService],
  imports: [PrismaModule, forwardRef(() => UsersModule)],
})
export class BlogsModule {}
