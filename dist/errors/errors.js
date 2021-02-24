"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorCodeEnum = void 0;
var ErrorCodeEnum;
(function (ErrorCodeEnum) {
    ErrorCodeEnum["OBJECT_NOT_FOUND"] = "OBJECT_NOT_FOUND";
})(ErrorCodeEnum = exports.ErrorCodeEnum || (exports.ErrorCodeEnum = {}));
class CustomError extends Error {
    constructor(code, message) {
        super(message);
        this.name = 'API Error';
        this.code = code;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.stack = new Error().stack;
    }
}
exports.default = CustomError;
//# sourceMappingURL=errors.js.map