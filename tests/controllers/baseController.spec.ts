import BaseController from "../../src/controllers/baseController";
import { expect } from 'chai'
import FormattedResponse from "../../src/network/base/formattedResponse";
import {createMockContext} from "@shopify/jest-koa-mocks";


describe('Base Controller Suite', function() {

    it('should return successful formatted response', function () {
        const ctx = createMockContext()

        const baseController = new BaseController()
        baseController.createValidResponse(ctx, {message: 'testing success'})

        const expectedResult = new FormattedResponse(200)
        expectedResult.data = {message: 'testing success'}
        expect(ctx.body).to.eql(expectedResult.toJSON())
    });

    it('Should return formatted response for failed 400 request', function () {
        const ctx = createMockContext()

        const baseController = new BaseController()
        baseController.createErrorResponse(ctx, 'testing success')

        const expectedResult = new FormattedResponse(400)
        expectedResult.message = 'testing success'
        expect(ctx.body).to.eql(expectedResult.toJSON())
        expect(ctx.res.statusCode).to.equal(400)
    })

    it('Should return formatted response for failed 500 request', function () {
        const ctx = createMockContext()

        const baseController = new BaseController()
        baseController.createErrorResponse(ctx, 'testing success', 500)

        const expectedResult = new FormattedResponse(500)
        expectedResult.message = 'testing success'
        expect(ctx.body).to.eql(expectedResult.toJSON())
        expect(ctx.res.statusCode).to.equal(500)
    })
})
