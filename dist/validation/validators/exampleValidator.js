"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePostRequest = exports.validateGetByIdsRequest = exports.validateGetByIdRequest = void 0;
const lodash_1 = require("lodash");
const index_1 = __importDefault(require("./index"));
const schemas_1 = __importDefault(require("../schemas"));
function validateGetByIdRequest(ctx) {
    if (lodash_1.get(ctx.params, 'id')) {
        return {
            ids: [ctx.params.id],
            error: false,
        };
    }
    return {
        ids: [],
        error: true,
        errorMessage: "property id not provided"
    };
}
exports.validateGetByIdRequest = validateGetByIdRequest;
function validateGetByIdsRequest(ctx) {
    let queryIds;
    if (lodash_1.get(ctx.query, 'ids[]')) {
        queryIds = ctx.query['ids[]'];
    }
    else if (lodash_1.get(ctx.query, 'ids')) {
        queryIds = ctx.query['ids'];
    }
    if (lodash_1.isNil(queryIds)) {
        return {
            ids: [],
            error: true,
            errorMessage: 'Property "ids" not found'
        };
    }
    let ids = [];
    if (lodash_1.isArray(queryIds)) {
        for (const companyId of queryIds) {
            if (lodash_1.isNumber(companyId)) {
                ids.push(companyId);
            }
            else if (!isNaN(Number(companyId.toString()))) {
                ids.push(parseInt(companyId, 10));
            }
        }
    }
    else if (lodash_1.isString(queryIds)) {
        const explodedIds = queryIds.split(',');
        ids = explodedIds.reduce((acc, next) => {
            if (typeof parseInt(next, 10) === "number") {
                acc.push(parseInt(next, 10));
            }
            return acc;
        }, []);
    }
    else if (typeof parseInt(queryIds, 10) !== "number") {
        ids.push(queryIds);
    }
    else {
        return {
            ids,
            error: true,
            errorMessage: 'Property "ids" must be an array or a number'
        };
    }
    return {
        ids,
        error: false
    };
}
exports.validateGetByIdsRequest = validateGetByIdsRequest;
function validatePostRequest(ctx) {
    return index_1.default.validateSchema(schemas_1.default.Example.EXAMPLE_POST, ctx.request.body);
}
exports.validatePostRequest = validatePostRequest;
//# sourceMappingURL=exampleValidator.js.map