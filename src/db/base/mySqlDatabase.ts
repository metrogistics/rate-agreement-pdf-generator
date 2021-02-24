import mysql, {MysqlError, Pool, PoolConfig, PoolConnection} from "mysql";
import {logger} from "../../middleware";
import SqlStatement from "./sqlStatement";
import QueryResult from "./queryResult";
import Database from "./database";

export default class MySqlDatabase extends Database {

    private pool: Pool

    constructor(config: PoolConfig) {
        super()
        this.pool = mysql.createPool(config)
        this.setup()
    }

    setup(): void {
        // Fired when a new Client is connected.
        this.pool.on('connection', (client: PoolConnection) => {
            client.on('error', (err: MysqlError) => logger.error(`db error: bizarre client error: ${err.message}`, err))
        })

        // Fired when an idle Client emits an error.
        this.pool.on('error', err => logger.error(`db error: idle client error: ${err.message}`, err))

    }

    sqlQuery = async <T>({text, values}: SqlStatement): Promise<QueryResult<T>> => {
        return new Promise<QueryResult<T>>((resolve, reject) => {
            this.pool.getConnection(((err, connection) => {
                if (err) {
                    reject(err)
                    return
                }
                connection.query(
                    {sql: text, values: values},
                    (error, results) => {
                        connection.release()
                        if (error) {
                            resolve({
                                numRows: 0,
                                rows: [],
                                error: true,
                                errorMsg: error.message,
                            })
                            return
                        }
                        resolve({
                            numRows: results.length,
                            rows: results,
                            error: false,
                            errorMsg: null
                        })
                    })
            }))
        })
    }
}
