
export enum ErrorCodeEnum {
    OBJECT_NOT_FOUND = "OBJECT_NOT_FOUND",
}

export default class CustomError extends Error {

    code: ErrorCodeEnum

    constructor(code: ErrorCodeEnum, message?: string) {
        super(message);
        this.name = 'API Error';
        this.code = code
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.stack = (<any> new Error()).stack;
    }
}
