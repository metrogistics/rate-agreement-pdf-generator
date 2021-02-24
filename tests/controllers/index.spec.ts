import * as controllers from "../../src/controllers"
import ExampleController from "../../src/controllers/exampleController";

describe("Controllers Index tests", function () {
    it('Should export all controllers', function () {
        expect(Object.keys(controllers).length).toEqual(1)
        expect(controllers['firstController']).toBeInstanceOf(ExampleController)
    })
})
