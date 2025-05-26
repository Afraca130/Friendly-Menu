"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_response_interceptor_1 = require("./common/interceptors/api-response.interceptor");
const error_interceptor_1 = require("./common/interceptors/error.interceptor");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        exceptionFactory: (errors) => {
            const messages = errors.map((error) => {
                if (error.constraints) {
                    return Object.values(error.constraints).join(', ');
                }
                return 'Validation failed';
            });
            return new common_1.HttpException({
                message: 'Validation failed',
                errors: messages,
            }, common_1.HttpStatus.BAD_REQUEST);
        },
    }));
    app.useGlobalInterceptors(new api_response_interceptor_1.ApiResponseInterceptor(), new error_interceptor_1.ErrorInterceptor());
    const config = new swagger_1.DocumentBuilder()
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
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map