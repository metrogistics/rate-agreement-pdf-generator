import ExampleTable from "../tables/exampleTable";

export default class ExampleEntity {

    _id?: string
    id: number
    name: string
    info: string|null
    createdAt: Date
    updatedAt: Date

    constructor(id: number, name: string, info: string|null, createdAt: Date, updatedAt: Date) {
        this.id = id
        this.name = name
        this.info = info
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }

    static from(exampleTable: ExampleTable): ExampleEntity {
        const entity = new ExampleEntity(
            exampleTable.id,
            exampleTable.name,
            exampleTable.info,
            exampleTable.created_at,
            exampleTable.updated_at,
        )
        entity._id = exampleTable.uid
        return entity
    }

    // insert = async () => {
    //     const insertQuery = createEntity(this)
    //     await db.sqlQuery(insertQuery)
    // }

    toJSON(): Record<string, unknown> {
        return {
            id: this.id,
            name: this.name,
            info: this.info,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        }
    }

}

