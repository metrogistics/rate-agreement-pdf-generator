import {
    forIds, forId,
} from '../db/sql/exampleQueries'
import {db} from "../db";
import ExampleTable from "../db/tables/exampleTable";
import ExampleEntity from "../db/entities/exampleEntity";

export default class ExamplePersistence {

    getByIds = async (ids: number[]): Promise<ExampleEntity[]> => {
        // const query = forIds(ids)
        // const results = await db.sqlQuery<ExampleTable>(query)
        //
        // return Promise.all(results.rows.map(async element => {
        //     return ExampleEntity.from(element)
        // }))

        return ids.map(element => {
            return new ExampleEntity(element, `Example ${element}`, `Info about an example entity: ${element}`, new Date(), new Date())
        })

    }

    getById = async (id: number): Promise<ExampleEntity|null> => {
        // const query = forId(id)
        // const results = await db.sqlQuery<ExampleTable>(query)
        //
        // if (results.error) {
        //     throw Error(`Failed to fetch by ids: ${results.errorMsg!}`)
        // }
        // if (results.rows.length <= 0) {
        //     return null
        // }
        //
        // return ExampleEntity.from(results.rows[0])

        return new ExampleEntity(id, `Example ${id}`, `Info about an example entity: ${id}`, new Date(), new Date())
    }
}
