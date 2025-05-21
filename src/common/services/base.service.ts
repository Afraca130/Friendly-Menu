import { HttpException, HttpStatus } from '@nestjs/common';

export abstract class BaseService {
  protected async handleAsync<T>(
    operation: () => Promise<T>,
    errorMessage: string = 'Operation failed',
  ): Promise<T> {
    try {
      return await operation();
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      console.error(`Error in ${this.constructor.name}:`, error);
      throw new HttpException(
        {
          message: errorMessage,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
