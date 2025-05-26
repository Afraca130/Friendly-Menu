"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTableTypeDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_table_type_dto_1 = require("./create-table-type.dto");
class UpdateTableTypeDto extends (0, mapped_types_1.PartialType)(create_table_type_dto_1.CreateTableTypeDto) {
}
exports.UpdateTableTypeDto = UpdateTableTypeDto;
//# sourceMappingURL=update-table-type.dto.js.map