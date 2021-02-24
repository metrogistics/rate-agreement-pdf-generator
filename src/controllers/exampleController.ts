import Koa from "koa";
import ExamplePersistence from "../persistence/examplePersistence";
import BaseController from "./baseController";
import {logger} from "../middleware";
import * as validator from '../validation/validators/exampleValidator'

export default class ExampleController extends BaseController {

    getOne = async (ctx: Koa.Context): Promise<void> => {
        try {
            const request = validator.validateGetByIdRequest(ctx)
            logger.info(JSON.stringify(request))
            if (request.error) {
                return this.createErrorResponse(ctx, request.errorMessage || 'Unknown error reason', 400)
            }
            const persistence = new ExamplePersistence()
            const data = await persistence.getById(request.ids[0])
            return this.createValidResponse(ctx, data)
        } catch (error) {
            ctx.body = {
                success: false,
                message: error.message
            }
        }
    }

    getMany = async (ctx: Koa.Context): Promise<void> => {
        try {
            const request = validator.validateGetByIdsRequest(ctx)
            if (request.error) {
                return this.createErrorResponse(ctx, request.errorMessage || 'Unknown error reason', 400)
            }
            const persistence = new ExamplePersistence()
            const examples = await persistence.getByIds(request.ids)
            return this.createValidResponse(ctx, examples)
        } catch (error) {
            ctx.body = {
                success: false,
                message: error.message
            }
        }
    }
}
