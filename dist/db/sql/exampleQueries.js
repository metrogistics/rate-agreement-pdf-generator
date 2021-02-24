"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forIds = exports.forId = void 0;
const sqlStatement_1 = __importDefault(require("../base/sqlStatement"));
const sqlHelper_1 = __importDefault(require("../base/sqlHelper"));
function forId(id) {
    return new sqlStatement_1.default(`
        SELECT * FROM public.example_table
        WHERE id = $1
        `, [id]);
}
exports.forId = forId;
function forIds(ids) {
    const bulkSelect = sqlHelper_1.default.createBulkStatement(ids);
    return new sqlStatement_1.default(`
        SELECT * FROM public.example_table
        WHERE id IN ${bulkSelect.valueString}
        `, bulkSelect.values);
}
exports.forIds = forIds;
//# sourceMappingURL=exampleQueries.js.map