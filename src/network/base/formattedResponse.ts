import { isNil, get } from 'lodash'

interface Result {
    success: boolean
    statusCode: number
    message: string|null
    count: number
}

export default class FormattedResponse {

    readonly statusCode: number
    private _success = false
    message: string|null = null
    data: unknown|null = null

    get result(): Result {
        return {
            success: this._success,
            statusCode: this.statusCode,
            message: this.message,
            count: this.generateCount()
        }
    }

    get success(): boolean {
        return this._success
    }

    constructor(statusCode: number) {
        this.statusCode = statusCode
        this.setStatus()
    }

    private setStatus = (): void => {
        // logger.info(`What is the statusCode: ${this.statusCode} - status: ${this.statusCode >= 200 && this.statusCode < 400}`)
        // eslint-disable-next-line no-invalid-this
        this._success = this.statusCode >= 200 && this.statusCode < 400
        if (this.statusCode === 200) {
            this.message = 'Success'
        }
    }

    private generateCount = (): number => {
        if (!isNil(this.data) && Array.isArray(this.data)) {
            return this.data.length
        } else if (!isNil(this.data)) {
            return 1
        }
        return 0
    }

    toJSON(): Record<string, unknown> {
        const { result, data } = this
        return { result, data }
    }
}

export function isFormattedResponse(response: unknown): response is FormattedResponse {
    if (isNil(response))
        return false

    return get(response, 'data') !== undefined && get(response, 'result') !== undefined
}
