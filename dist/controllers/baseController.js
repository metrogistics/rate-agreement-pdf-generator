"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const formattedResponse_1 = __importDefault(require("../network/base/formattedResponse"));
class BaseController {
    createErrorResponse(ctx, message, code) {
        console.log('error response');
        const response = new formattedResponse_1.default(code || 400);
        response.message = message;
        ctx.body = response.toJSON();
        ctx.response.status = code || 400;
    }
    createValidResponse(ctx, data) {
        const response = new formattedResponse_1.default(200);
        response.data = data;
        ctx.body = response.toJSON();
        ctx.response.status = 200;
    }
}
exports.default = BaseController;
//# sourceMappingURL=baseController.js.map