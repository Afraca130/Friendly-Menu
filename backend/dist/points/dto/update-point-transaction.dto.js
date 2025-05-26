"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePointTransactionDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_point_transaction_dto_1 = require("./create-point-transaction.dto");
class UpdatePointTransactionDto extends (0, mapped_types_1.PartialType)(create_point_transaction_dto_1.CreatePointTransactionDto) {
}
exports.UpdatePointTransactionDto = UpdatePointTransactionDto;
//# sourceMappingURL=update-point-transaction.dto.js.map