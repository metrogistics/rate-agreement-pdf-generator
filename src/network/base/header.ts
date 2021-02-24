
export interface HeaderType {
    name: string
    value: string
}

export class Header implements HeaderType {
    name: string;
    value: string;

    constructor(name: string, value: string) {
        this.name = name
        this.value = value
    }
}
