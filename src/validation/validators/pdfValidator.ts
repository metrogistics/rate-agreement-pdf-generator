import Koa from "koa"
import {get as loGet, isArray, isNil, isNumber, isString} from 'lodash'
import PdfRequest from "../../request/pdfRequest";
import validator from "./index";
import Schemas from "../schemas";
import {SchemaValidationResult} from "./schemaValidator";

export function validateGetByLoadRequest(ctx: Koa.Context): PdfRequest {
    if (ctx.params, 'load') {
        return {
            load: [ctx.params.load],
            error: false,
        }
    }
    return {
        load: -1,
        error: true,
        errorMessage: "property id not provided"
    }
}


export function validatePostRequest(ctx: Koa.Context): SchemaValidationResult {
    return validator.validateSchema(Schemas.Example.EXAMPLE_POST, ctx.request.body)
}
