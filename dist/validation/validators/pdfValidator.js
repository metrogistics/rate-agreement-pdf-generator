"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePostRequest = exports.validateGetByLoadRequest = void 0;
const index_1 = __importDefault(require("./index"));
const schemas_1 = __importDefault(require("../schemas"));
function validateGetByLoadRequest(ctx) {
    if (ctx.params, 'load') {
        return {
            load: [ctx.params.load],
            error: false,
        };
    }
    return {
        load: -1,
        error: true,
        errorMessage: "property id not provided"
    };
}
exports.validateGetByLoadRequest = validateGetByLoadRequest;
function validatePostRequest(ctx) {
    return index_1.default.validateSchema(schemas_1.default.Example.EXAMPLE_POST, ctx.request.body);
}
exports.validatePostRequest = validatePostRequest;
//# sourceMappingURL=pdfValidator.js.map