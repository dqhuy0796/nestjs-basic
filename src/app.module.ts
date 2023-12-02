import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogsModule } from './module/blogs/blogs.module';
import { UsersModule } from './module/users/users.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { UsersController } from './module/users/users.controller';
import { AuthModule } from './module/auth/auth.module';

@Module({
  imports: [BlogsModule, UsersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(UsersController);
  }
}
