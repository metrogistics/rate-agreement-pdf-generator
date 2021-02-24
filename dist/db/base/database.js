"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const middleware_1 = require("../../middleware");
class Database {
    constructor() {
        this.healthCheck = (ctx) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.sqlQuery({ text: "SELECT 'Success' as \"message\"", values: [] }, false);
                if (result.numRows === 0) {
                    middleware_1.logger.error(`Failed to connect to database: No results returned from query`);
                    ctx.status = 500;
                    ctx.body = { message: "Health check failure" };
                    return;
                }
                ctx.status = 200;
                ctx.body = result.rows[0];
            }
            catch (error) {
                middleware_1.logger.error(`Failed to connect to database: ${error}`);
                ctx.status = 500;
                ctx.body = { message: "Health check failure" };
            }
        });
    }
}
exports.default = Database;
//# sourceMappingURL=database.js.map