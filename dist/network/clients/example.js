"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const exampleEndpoint_1 = __importDefault(require("../endpoints/exampleEndpoint"));
const requestMethod_1 = require("../base/requestMethod");
const client_1 = __importDefault(require("../base/client"));
const lodash_1 = require("lodash");
const errors_1 = __importStar(require("../../errors/errors"));
class ExampleClient extends client_1.default {
    constructor() {
        super(...arguments);
        this.getForId = (id) => __awaiter(this, void 0, void 0, function* () {
            const endpoint = new exampleEndpoint_1.default(requestMethod_1.RequestMethod.GET, 'v1');
            if (lodash_1.isEmpty(endpoint.baseUrl())) {
                throw Error(`Failed to fetch data: Example Endpoint is not set`);
            }
            endpoint.appendPathComponents([id.toString(10)]);
            const result = yield this.makeRequestTo(endpoint);
            if (!result.success) {
                throw new errors_1.default(errors_1.ErrorCodeEnum.OBJECT_NOT_FOUND, `Failed to fetch for id: ${result.message || 'Unknown error reason'}`);
            }
            return result.data;
        });
    }
}
exports.default = ExampleClient;
//# sourceMappingURL=example.js.map