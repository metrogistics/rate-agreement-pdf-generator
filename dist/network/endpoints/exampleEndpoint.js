"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const endpoint_1 = __importDefault(require("../base/endpoint"));
const header_1 = require("../base/header");
const lodash_1 = require("lodash");
class ExampleEndpoint extends endpoint_1.default {
    authHeader() {
        if (!lodash_1.isNil(process.env.API_AUTH)) {
            return new header_1.Header("Authorization", `Bearer ${process.env.API_AUTH}`);
        }
        return undefined;
    }
    baseUrl() {
        return process.env.CARGOTEL_API || '';
    }
}
exports.default = ExampleEndpoint;
//# sourceMappingURL=exampleEndpoint.js.map