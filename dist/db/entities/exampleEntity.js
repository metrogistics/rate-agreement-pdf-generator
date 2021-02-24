"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ExampleEntity {
    constructor(id, name, info, createdAt, updatedAt) {
        this.id = id;
        this.name = name;
        this.info = info;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    static from(exampleTable) {
        const entity = new ExampleEntity(exampleTable.id, exampleTable.name, exampleTable.info, exampleTable.created_at, exampleTable.updated_at);
        entity._id = exampleTable.uid;
        return entity;
    }
    // insert = async () => {
    //     const insertQuery = createEntity(this)
    //     await db.sqlQuery(insertQuery)
    // }
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            info: this.info,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
}
exports.default = ExampleEntity;
//# sourceMappingURL=exampleEntity.js.map