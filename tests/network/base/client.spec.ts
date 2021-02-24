import axios from "axios"
import Endpoint from "../../../src/network/base/endpoint";
import {RequestMethod} from "../../../src/network/base/requestMethod";
import {HeaderType} from "../../../src/network/base/header";
import NetworkClient from "../../../src/network/base/client";

jest.mock('axios')

describe("Network Client tests", function () {

    it("should makeRequestTo given endpoint", async function () {

        const endpoint = new TestEndpoint(RequestMethod.GET, 'get-test')
        const testObject = new NetworkClient()

        const result = await testObject.makeRequestTo(endpoint, null)

        expect(axios).toHaveBeenCalledTimes(1)

        // mock.mockRestore()
    })
})

class TestEndpoint extends Endpoint {
    authHeader(): HeaderType | undefined {
        return undefined;
    }

    baseUrl(): string {
        return "";
    }

}
