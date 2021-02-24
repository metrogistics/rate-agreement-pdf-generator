import Koa from "koa"
import {get as loGet, isArray, isNil, isNumber, isString} from 'lodash'
import ExampleRequest from "../../request/exampleRequest";
import validator from "./index";
import Schemas from "../schemas";
import {SchemaValidationResult} from "./schemaValidator";

export function validateGetByIdRequest(ctx: Koa.Context): ExampleRequest {

    if (loGet(ctx.params, 'id')) {
        return {
            ids: [ctx.params.id],
            error: false,
        }
    }
    return {
        ids: [],
        error: true,
        errorMessage: "property id not provided"
    }
}

export function validateGetByIdsRequest(ctx: Koa.Context): ExampleRequest {

    let queryIds;
    if (loGet(ctx.query, 'ids[]')) {
        queryIds = ctx.query['ids[]']
    } else if (loGet(ctx.query, 'ids')) {
        queryIds = ctx.query['ids']
    }

    if (isNil(queryIds)) {
        return {
            ids:[],
            error: true,
            errorMessage: 'Property "ids" not found'
        }
    }

    let ids: number[] = []
    if (isArray(queryIds)) {
        for (const companyId of queryIds) {
            if (isNumber(companyId)) {
                ids.push(companyId)
            } else if (!isNaN(Number(companyId.toString()))) {
                ids.push(parseInt(companyId, 10))
            }
        }
    } else if (isString(queryIds)) {
        const explodedIds = queryIds.split(',')
        ids = explodedIds.reduce((acc: number[], next) => {
            if (typeof parseInt(next, 10) === "number") {
                acc.push(parseInt(next, 10))
            }
            return acc
        }, [])
    } else if (typeof parseInt(queryIds, 10) !== "number") {
        ids.push(queryIds)
    } else {
        return {
            ids,
            error: true,
            errorMessage: 'Property "ids" must be an array or a number'
        }
    }

    return {
        ids,
        error: false
    }
}

export function validatePostRequest(ctx: Koa.Context): SchemaValidationResult {
    return validator.validateSchema(Schemas.Example.EXAMPLE_POST, ctx.request.body)
}
