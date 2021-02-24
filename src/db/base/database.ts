import SqlStatement from "./sqlStatement";
import QueryResult from "./queryResult";
import Koa from "koa";
import {logger} from "../../middleware";

export default abstract class Database {
    abstract sqlQuery<T>({text, values}: SqlStatement, throws: boolean): Promise<QueryResult<T>>;

    healthCheck = async (ctx: Koa.Context): Promise<void> => {
        try {
            const result = await this.sqlQuery({ text: "SELECT 'Success' as \"message\"", values: [] }, false)

            if (result.numRows === 0) {
                logger.error(`Failed to connect to database: No results returned from query`)
                ctx.status = 500
                ctx.body = { message: "Health check failure" }
                return
            }

            ctx.status = 200
            ctx.body = result.rows[0]
        } catch (error) {
            logger.error(`Failed to connect to database: ${error}`)
            ctx.status = 500
            ctx.body = { message: "Health check failure" }
        }
    }
}
