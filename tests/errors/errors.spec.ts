import CustomError, {ErrorCodeEnum} from "../../src/errors/errors";

describe('Errors tests', function () {
    it('Should create a custom error', function () {
        expect(() => {
            throw new CustomError(ErrorCodeEnum.OBJECT_NOT_FOUND, 'object does not exist')
        }).toThrow(new CustomError(ErrorCodeEnum.OBJECT_NOT_FOUND, 'object does not exist'))
    })

    it('Should construct with all properties', function () {
        const customError = new CustomError(ErrorCodeEnum.OBJECT_NOT_FOUND, 'Object not found')

        expect(customError.name).toEqual('API Error')
        expect(customError.code).toEqual(ErrorCodeEnum.OBJECT_NOT_FOUND)
        expect(customError.stack).toContain("at new CustomError")
    })
})
