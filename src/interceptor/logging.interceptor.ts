import { Observable } from 'rxjs';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // console.log('Interceptor logger ');

    const start = Date.now();

    return next
      .handle()
      .pipe(tap(() => console.log(`after ${Date.now() - start}ms`)));
  }
}
