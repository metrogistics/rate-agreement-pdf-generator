import examplePostSchema from "./examplePostRequest.json"

export const schemas: {[key: string]: Record<string, unknown>} = {
    examplePostSchema: examplePostSchema,
}

namespace Schemas {
    export enum Example {
        EXAMPLE_POST = "examplePostSchema"
    }
}

export default Schemas
