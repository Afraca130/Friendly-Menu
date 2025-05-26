"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateWaitingDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_waiting_dto_1 = require("./create-waiting.dto");
class UpdateWaitingDto extends (0, mapped_types_1.PartialType)(create_waiting_dto_1.CreateWaitingDto) {
}
exports.UpdateWaitingDto = UpdateWaitingDto;
//# sourceMappingURL=update-waiting.dto.js.map