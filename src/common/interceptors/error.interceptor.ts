import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiResponse } from '../interfaces/api-response.interface';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';
        let errors: string[] = [];

        if (error instanceof HttpException) {
          status = error.getStatus();
          const response = error.getResponse();
          message =
            typeof response === 'string' ? response : response['message'];
          errors = Array.isArray(response['message'])
            ? response['message']
            : [message];
        } else if (error instanceof Error) {
          message = error.message;
          errors = [error.message];
        }

        const errorResponse: ApiResponse<null> = {
          success: false,
          statusCode: status,
          message,
          errors,
          timestamp: new Date().toISOString(),
        };

        return throwError(() => new HttpException(errorResponse, status));
      }),
    );
  }
}
