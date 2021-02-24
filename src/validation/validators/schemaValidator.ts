import Ajv, {ValidateFunction} from "ajv";
import {isNil} from "lodash";
import Schemas, {schemas} from "../schemas";

export interface SchemaValidationResult {
    success: boolean,
    message: string|null
}

export default class SchemaValidator {

    private validators: {[key: string]: ValidateFunction} = {}

    constructor() {
        //load schema.json files

        const ajv = new Ajv()
        Object.keys(schemas).forEach(key => {
            this.validators[key] = ajv.compile(schemas[key])
        })
    }

    validateSchema(schemaName: Schemas.Example, element: unknown): SchemaValidationResult {

        const validate = this.validators[schemaName]
        const isValid = validate(element)

        // logger.error(`Should be validating against: ${JSON.stringify(validate.schema)}`)

        if (!isValid) {
            let message: string
            if (!isNil(validate.errors) && validate.errors.length > 0) {
                message = `${validate.errors[0].dataPath} ${validate.errors[0].message || null}`
            } else {
                message = 'Validation failed for an unknown reason'
            }
            return {
                success: false,
                message
            }
        }
        return {
            success: true,
            message: null
        }
    }
}
