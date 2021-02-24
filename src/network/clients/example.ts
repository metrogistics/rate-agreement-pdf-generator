import ExampleEndpoint from "../endpoints/exampleEndpoint";
import {RequestMethod} from "../base/requestMethod";
import NetworkClient from "../base/client";
import {isEmpty} from 'lodash'
import CustomError, {ErrorCodeEnum} from "../../errors/errors";

export default class ExampleClient extends NetworkClient {

    getForId = async (id: number): Promise<unknown|null> => {
        const endpoint = new ExampleEndpoint(RequestMethod.GET, 'v1')
        if (isEmpty(endpoint.baseUrl())) {
            throw Error(`Failed to fetch data: Example Endpoint is not set`)
        }

        endpoint.appendPathComponents([id.toString(10)])
        const result = await this.makeRequestTo(endpoint)

        if (!result.success) {
            throw new CustomError(ErrorCodeEnum.OBJECT_NOT_FOUND, `Failed to fetch for id: ${result.message || 'Unknown error reason'}`)
        }

        return result.data
    }
}
