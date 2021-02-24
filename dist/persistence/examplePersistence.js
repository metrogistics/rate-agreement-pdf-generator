"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const exampleEntity_1 = __importDefault(require("../db/entities/exampleEntity"));
class ExamplePersistence {
    constructor() {
        this.getByIds = (ids) => __awaiter(this, void 0, void 0, function* () {
            // const query = forIds(ids)
            // const results = await db.sqlQuery<ExampleTable>(query)
            //
            // return Promise.all(results.rows.map(async element => {
            //     return ExampleEntity.from(element)
            // }))
            return ids.map(element => {
                return new exampleEntity_1.default(element, `Example ${element}`, `Info about an example entity: ${element}`, new Date(), new Date());
            });
        });
        this.getById = (id) => __awaiter(this, void 0, void 0, function* () {
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
            return new exampleEntity_1.default(id, `Example ${id}`, `Info about an example entity: ${id}`, new Date(), new Date());
        });
    }
}
exports.default = ExamplePersistence;
//# sourceMappingURL=examplePersistence.js.map