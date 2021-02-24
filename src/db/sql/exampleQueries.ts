import SqlStatement from "../base/sqlStatement";
import sqlHelper from "../base/sqlHelper";

export function forId(id: number): SqlStatement {
    return new SqlStatement(
        `
        SELECT * FROM public.example_table
        WHERE id = $1
        `,
        [id]
    )
}

export function forIds(ids: number[]): SqlStatement {
    const bulkSelect = sqlHelper.createBulkStatement(ids)


    return new SqlStatement(
        `
        SELECT * FROM public.example_table
        WHERE id IN ${bulkSelect.valueString}
        `,
        bulkSelect.values
    )
}
