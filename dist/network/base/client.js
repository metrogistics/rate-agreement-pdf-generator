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
const formattedResponse_1 = __importStar(require("./formattedResponse"));
const header_1 = require("./header");
const lodash_1 = require("lodash");
const axios_1 = __importDefault(require("axios"));
const Http = __importStar(require("http"));
const middleware_1 = require("../../middleware");
class NetworkClient {
    constructor() {
        this.headers = [
            new header_1.Header('Content-Type', 'application/json; charset=utf-8'),
        ];
        this.makeRequestTo = (endpoint, data) => __awaiter(this, void 0, void 0, function* () {
            const authHeader = endpoint.authHeader();
            if (!lodash_1.isNil(authHeader)) {
                this.headers.push(authHeader);
            }
            const results = yield this.networkCall(endpoint, data);
            let response = new formattedResponse_1.default(results.statusCode);
            response.message = results.statusText;
            if (formattedResponse_1.isFormattedResponse(results.payload)) {
                response = new formattedResponse_1.default(results.payload.result.statusCode);
                response.message = results.payload.result.message;
                response.data = results.payload.data;
            }
            else {
                response.data = results.payload;
            }
            if (!response.success) {
                middleware_1.logger.error(`Axios failure: ${JSON.stringify(results)}`);
            }
            return response;
        });
        this.networkCall = (endpoint, body) => __awaiter(this, void 0, void 0, function* () {
            try {
                const config = {
                    method: endpoint.method,
                    headers: this.mappedHeaders,
                    url: endpoint.url,
                    data: body,
                    timeout: 30 * 1000,
                };
                const response = yield axios_1.default(config);
                return {
                    payload: response.data,
                    statusCode: response.status,
                    statusText: response.statusText,
                    error: response.status < 400 && response.status >= 200,
                };
            }
            catch (e) {
                if (lodash_1.isNil(e.response)) {
                    if (e.code === 'ENOTFOUND') {
                        return {
                            payload: e.message,
                            statusCode: 404,
                            statusText: `route to ${e.hostname} not found`,
                            error: true,
                        };
                    }
                    return {
                        payload: e.rawResponse || e.message,
                        statusCode: 504,
                        statusText: Http.STATUS_CODES[504] || 'Gateway Timeout',
                        error: true
                    };
                }
                if (lodash_1.get(e.response, 'data')) {
                    const payload = e.response.data;
                    if (formattedResponse_1.isFormattedResponse(payload)) {
                        return {
                            payload: payload.data,
                            statusCode: payload.result.statusCode,
                            statusText: payload.result.message || (Http.STATUS_CODES[e.response.status] || `Error ${e.response.status}`),
                            error: true
                        };
                    }
                    return {
                        payload: payload.data,
                        statusCode: e.response.status,
                        statusText: Http.STATUS_CODES[e.response.status] || `Error ${e.response.status}`,
                        error: true
                    };
                }
                return {
                    payload: e.rawResponse || e.message,
                    statusCode: e.response.status,
                    statusText: Http.STATUS_CODES[e.response.status] || `Error ${e.response.status}`,
                    error: true,
                };
            }
        });
    }
    get mappedHeaders() {
        return this.headers.reduce((acc, next) => {
            acc[next.name] = next.value;
            return acc;
        }, {});
    }
}
exports.default = NetworkClient;
//# sourceMappingURL=client.js.map