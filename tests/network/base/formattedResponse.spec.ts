import FormattedResponse, {isFormattedResponse} from "../../../src/network/base/formattedResponse";

describe("Formatted Response Suite", function () {
    it("Should be successful when 200", function () {
        const resp = new FormattedResponse(200)
        resp.message = "test success"
        resp.data = { data: "data" }

        expect(resp.toJSON()).toEqual({
            result: {
                success: true,
                statusCode: 200,
                message: "test success",
                count: 1
            },
            data: {
                data: "data"
            }
        })
    })

    it('expect success function to be true if 200s', function () {
        const resp = new FormattedResponse(200)
        resp.message = "test success"
        resp.data = { data: "data" }

        expect(resp.success).toBe(true)
    })

    it('expect success function to be false if not 200s', function () {
        const resp = new FormattedResponse(400)
        resp.message = "failure"
        resp.data = { data: "data" }

        expect(resp.success).toBe(false)
    })

    it('expect result->count to equal data element count', function () {
        const resp = new FormattedResponse(200)
        resp.message = "test success"
        resp.data = [ "one", "two", "three" ]

        expect(resp.result.count).toEqual(3)
    })

    it('expect result->count to equal 0 if data is null', function () {
        const resp = new FormattedResponse(200)
        resp.message = "test success"
        resp.data = null
        expect(resp.result.count).toEqual(0)
    })

    it('expect result->count to equal 1 if data is empty object', function () {
        const resp = new FormattedResponse(200)
        resp.message = "test success"
        resp.data = {}
        expect(resp.result.count).toStrictEqual(1)
    })

    it('expect result->count to equal 1 if data is string', function () {
        const resp = new FormattedResponse(200)
        resp.message = "test success"
        resp.data = "test data"
        expect(resp.result.count).toStrictEqual(1)
    })

    it('expect JSON object to match formatted response', function () {
        const jsonFormattedResponse = {
            result: {
                success: true,
                statusCode: 200,
                message: "test success",
                count: 1
            },
            data: {
                data: "data"
            }
        }

        const isFormattedResp = isFormattedResponse(jsonFormattedResponse)
        expect(isFormattedResp).toStrictEqual(true)
    })

    it('expect null object to not match formatted response', function () {
        const jsonFormattedResponse = null

        const isFormattedResp = isFormattedResponse(jsonFormattedResponse)
        expect(isFormattedResp).toStrictEqual(false)
    })

    it('expect invalid JSON object to NOT match formatted response', function () {
        const jsonFormattedResponse = {
            result: {
                success: true,
                statusCode: 200,
                message: "test success",
                count: 1
            }
        }

        const isFormattedResp = isFormattedResponse(jsonFormattedResponse)
        expect(isFormattedResp).toStrictEqual(false)
    })
})
