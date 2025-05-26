"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
let ErrorInterceptor = class ErrorInterceptor {
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.catchError)((error) => {
            let status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
            let message = 'Internal server error';
            let errors = [];
            if (error instanceof common_1.HttpException) {
                status = error.getStatus();
                const response = error.getResponse();
                if (typeof response === 'string') {
                    message = response;
                    errors = [response];
                }
                else if (typeof response === 'object') {
                    message = response['message'] || message;
                    errors = Array.isArray(response['message'])
                        ? response['message']
                        : [message];
                }
            }
            else if (error instanceof Error) {
                message = error.message;
                errors = [error.message];
            }
            const errorResponse = {
                success: false,
                statusCode: status,
                message,
                errors,
                timestamp: new Date().toISOString(),
            };
            return (0, rxjs_1.throwError)(() => new common_1.HttpException(errorResponse, status));
        }));
    }
};
exports.ErrorInterceptor = ErrorInterceptor;
exports.ErrorInterceptor = ErrorInterceptor = __decorate([
    (0, common_1.Injectable)()
], ErrorInterceptor);
//# sourceMappingURL=error.interceptor.js.map