import FormattedResponse, {isFormattedResponse} from "./formattedResponse";
import Endpoint from "./endpoint";
import {Header, HeaderType} from "./header";
import {isNil, get} from 'lodash'
import {AxiosRequestConfig, default as axios} from 'axios'
import * as Http from "http";
import {logger} from "../../middleware";

interface NetworkResponse {
    payload: unknown
    statusCode: number
    statusText: string
    error: boolean
}

export default class NetworkClient {

    private headers: HeaderType[] = [
        new Header('Content-Type', 'application/json; charset=utf-8'),
    ]

    private get mappedHeaders(): Record<string, unknown> {
        return this.headers.reduce((acc:{ [key: string]: string }, next) => {
            acc[next.name] = next.value
            return acc
        }, {})
    }

    makeRequestTo = async (endpoint: Endpoint, data?: unknown): Promise<FormattedResponse> => {
        const authHeader = endpoint.authHeader()
        if (!isNil(authHeader)) {
            this.headers.push(authHeader)
        }

        const results = await this.networkCall(endpoint, data)
        let response = new FormattedResponse(results.statusCode)
        response.message = results.statusText

        if (isFormattedResponse(results.payload)) {
            response = new FormattedResponse(results.payload.result.statusCode)
            response.message = results.payload.result.message
            response.data = results.payload.data
        } else {
            response.data = results.payload
        }

        if (!response.success) {
            logger.error(`Axios failure: ${JSON.stringify(results)}`)
        }

        return response
    }

    private networkCall = async (endpoint: Endpoint, body?: unknown): Promise<NetworkResponse> => {
        try {

            const config: AxiosRequestConfig = {
                method: endpoint.method,
                headers: this.mappedHeaders,
                url: endpoint.url,
                data: body,
                timeout: 30 * 1000,
            }

            const response = await axios(config)
            return {
                payload: response.data,
                statusCode: response.status,
                statusText: response.statusText,
                error: response.status < 400 && response.status >= 200,
            }
        } catch (e) {
            if (isNil(e.response)) {
                if (e.code === 'ENOTFOUND') {
                    return {
                        payload: e.message,
                        statusCode: 404,
                        statusText: `route to ${e.hostname} not found`,
                        error: true,
                    }
                }
                return {
                    payload: e.rawResponse || e.message,
                    statusCode: 504,
                    statusText: Http.STATUS_CODES[504] || 'Gateway Timeout',
                    error: true
                }
            }

            if (get(e.response, 'data')) {
                const payload = e.response.data
                if (isFormattedResponse(payload)) {
                    return {
                        payload: payload.data,
                        statusCode: payload.result.statusCode,
                        statusText: payload.result.message || (Http.STATUS_CODES[e.response.status] || `Error ${e.response.status}`),
                        error: true
                    }
                }
                return {
                    payload: payload.data,
                    statusCode: e.response.status,
                    statusText: Http.STATUS_CODES[e.response.status] || `Error ${e.response.status}`,
                    error: true
                }
            }

            return {
                payload: e.rawResponse || e.message,
                statusCode: e.response.status,
                statusText: Http.STATUS_CODES[e.response.status] || `Error ${e.response.status}`,
                error: true,
            }
        }
    }
}
