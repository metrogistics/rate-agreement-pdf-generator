"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ajv_1 = __importDefault(require("ajv"));
const lodash_1 = require("lodash");
const schemas_1 = require("../schemas");
class SchemaValidator {
    constructor() {
        //load schema.json files
        this.validators = {};
        const ajv = new ajv_1.default();
        Object.keys(schemas_1.schemas).forEach(key => {
            this.validators[key] = ajv.compile(schemas_1.schemas[key]);
        });
    }
    validateSchema(schemaName, element) {
        const validate = this.validators[schemaName];
        const isValid = validate(element);
        // logger.error(`Should be validating against: ${JSON.stringify(validate.schema)}`)
        if (!isValid) {
            let message;
            if (!lodash_1.isNil(validate.errors) && validate.errors.length > 0) {
                message = `${validate.errors[0].dataPath} ${validate.errors[0].message || null}`;
            }
            else {
                message = 'Validation failed for an unknown reason';
            }
            return {
                success: false,
                message
            };
        }
        return {
            success: true,
            message: null
        };
    }
}
exports.default = SchemaValidator;
//# sourceMappingURL=schemaValidator.js.map