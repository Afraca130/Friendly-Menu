import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ApiResponseInterceptor } from './common/interceptors/api-response.interceptor';
import { ErrorInterceptor } from './common/interceptors/error.interceptor';
import { HttpException, HttpStatus } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global pipes
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      exceptionFactory: (errors) => {
        const messages = errors.map((error) =>
          Object.values(error.constraints).join(', '),
        );
        return new HttpException(
          {
            message: 'Validation failed',
            errors: messages,
          },
          HttpStatus.BAD_REQUEST,
        );
      },
    }),
  );

  // Global interceptors
  app.useGlobalInterceptors(
    new ApiResponseInterceptor(),
    new ErrorInterceptor(),
  );

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Restaurant Management API')
    .setDescription('The restaurant management system API documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('auth', 'Authentication endpoints')
    .addTag('users', 'User management endpoints')
    .addTag('restaurants', 'Restaurant management endpoints')
    .addTag('menus', 'Menu management endpoints')
    .addTag('orders', 'Order management endpoints')
    .addTag('waitings', 'Waiting list management endpoints')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
