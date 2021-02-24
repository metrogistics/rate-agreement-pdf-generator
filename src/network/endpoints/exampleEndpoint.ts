import Endpoint from "../base/endpoint";
import {HeaderType, Header} from "../base/header";
import {isNil} from 'lodash'

export default class ExampleEndpoint extends Endpoint {

    authHeader(): HeaderType | undefined {
        if (!isNil(process.env.API_AUTH)) {
            return new Header("Authorization", `Bearer ${process.env.API_AUTH}`)
        }
        return undefined;
    }

    baseUrl(): string {
        return process.env.CARGOTEL_API || ''
    }

}
