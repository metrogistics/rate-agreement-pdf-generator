import {RequestMethod} from "./requestMethod";
import {HeaderType} from "./header";

export default abstract class Endpoint {

    readonly method: RequestMethod
    private _url: string
    get url(): string {
        return this._url
    }

    abstract baseUrl(): string;

    abstract authHeader(): HeaderType|undefined

    getParams?: {[key: string]: string|number}

    constructor(method: RequestMethod, path = '') {
        this.method = method
        if (path !== '') {
            this._url = `${this.baseUrl()}/${path}`
        } else {
            this._url = `${this.baseUrl()}`
        }
    }

    appendPathComponent(component = '', spaceSubstitute = null): void {

        const trimmed = component.trim()
        const replaced = trimmed.replace(' ', spaceSubstitute || '_')
        this._url += `/${replaced}`
    }

    appendPathComponents(pathComponents: string[], spaceSubstitute = null): void {
        if (pathComponents.length < 1) { return }

        pathComponents.forEach(element => {
            this.appendPathComponent(element, spaceSubstitute)
        })
    }
}
