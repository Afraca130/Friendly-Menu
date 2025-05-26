"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = void 0;
const common_1 = require("@nestjs/common");
class BaseService {
    async handleAsync(operation, errorMessage = 'Operation failed') {
        try {
            return await operation();
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            console.error(`Error in ${this.constructor.name}:`, error);
            throw new common_1.HttpException({
                message: errorMessage,
                error: error.message,
            }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
}
exports.BaseService = BaseService;
//# sourceMappingURL=base.service.js.map