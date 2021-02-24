import config from './base/dbConfig'
import PostgresDatabase from "./base/postgresDatabase";

const database = new PostgresDatabase(config)
// Add any additional databases/configs here

export {
    database as db
}
