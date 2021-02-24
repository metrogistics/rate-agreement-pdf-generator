"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFormattedResponse = void 0;
const lodash_1 = require("lodash");
class FormattedResponse {
    constructor(statusCode) {
        this._success = false;
        this.message = null;
        this.data = null;
        this.setStatus = () => {
            // logger.info(`What is the statusCode: ${this.statusCode} - status: ${this.statusCode >= 200 && this.statusCode < 400}`)
            // eslint-disable-next-line no-invalid-this
            this._success = this.statusCode >= 200 && this.statusCode < 400;
            if (this.statusCode === 200) {
                this.message = 'Success';
            }
        };
        this.generateCount = () => {
            if (!lodash_1.isNil(this.data) && Array.isArray(this.data)) {
                return this.data.length;
            }
            else if (!lodash_1.isNil(this.data)) {
                return 1;
            }
            return 0;
        };
        this.statusCode = statusCode;
        this.setStatus();
    }
    get result() {
        return {
            success: this._success,
            statusCode: this.statusCode,
            message: this.message,
            count: this.generateCount()
        };
    }
    get success() {
        return this._success;
    }
    toJSON() {
        const { result, data } = this;
        return { result, data };
    }
}
exports.default = FormattedResponse;
function isFormattedResponse(response) {
    if (lodash_1.isNil(response))
        return false;
    return lodash_1.get(response, 'data') !== undefined && lodash_1.get(response, 'result') !== undefined;
}
exports.isFormattedResponse = isFormattedResponse;
//# sourceMappingURL=formattedResponse.js.map