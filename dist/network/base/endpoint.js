"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Endpoint {
    constructor(method, path = '') {
        this.method = method;
        if (path !== '') {
            this._url = `${this.baseUrl()}/${path}`;
        }
        else {
            this._url = `${this.baseUrl()}`;
        }
    }
    get url() {
        return this._url;
    }
    appendPathComponent(component = '', spaceSubstitute = null) {
        const trimmed = component.trim();
        const replaced = trimmed.replace(' ', spaceSubstitute || '_');
        this._url += `/${replaced}`;
    }
    appendPathComponents(pathComponents, spaceSubstitute = null) {
        if (pathComponents.length < 1) {
            return;
        }
        pathComponents.forEach(element => {
            this.appendPathComponent(element, spaceSubstitute);
        });
    }
}
exports.default = Endpoint;
//# sourceMappingURL=endpoint.js.map