import FormattedResponse from "../network/base/formattedResponse";
import Koa from 'koa'

export default class BaseController {

    createErrorResponse(ctx: Koa.Context, message: string, code?: number): void {
        console.log('error response');
        const response = new FormattedResponse(code || 400)
        response.message = message
        ctx.body = response.toJSON()
        ctx.response.status = code || 400
    }

    createValidResponse(ctx: Koa.Context, data: unknown): void {
        const response = new FormattedResponse(200)
        response.data = data
        ctx.body = response.toJSON()
        ctx.response.status = 200
    }
}
