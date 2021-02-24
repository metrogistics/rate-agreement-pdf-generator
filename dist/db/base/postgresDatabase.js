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
const middleware_1 = require("../../middleware");
const pg_1 = require("pg");
const database_1 = __importDefault(require("./database"));
class PostgresDatabase extends database_1.default {
    constructor(config) {
        super();
        this.transQuery = (queries) => __awaiter(this, void 0, void 0, function* () {
            const client = yield this.pool.connect();
            try {
                yield client.query('BEGIN');
                return Promise.all(queries.map(statement => client.query(statement.text, statement.values))).then(result => {
                    client.query('COMMIT').then();
                    return result.map(row => {
                        return {
                            numRows: row.rowCount,
                            rows: row.rows,
                            error: false,
                            errorMsg: null,
                        };
                    });
                }).catch(errors => {
                    client.query('ROLLBACK').then();
                    return [{
                            numRows: 0,
                            rows: [],
                            error: true,
                            errorMsg: errors.message,
                        }];
                });
            }
            catch (e) {
                return [{
                        numRows: 0,
                        rows: [],
                        error: true,
                        errorMsg: e.message,
                    }];
            }
            finally {
                client.release();
            }
        });
        this.blockQuery = (transaction) => __awaiter(this, void 0, void 0, function* () {
            const client = yield this.pool.connect();
            try {
                yield client.query('BEGIN');
                const results = yield transaction(client);
                client.query('COMMIT').then();
                return results;
            }
            catch (error) {
                client.query('ROLLBACK').then();
                throw error;
            }
            finally {
                client.release();
            }
        });
        this.execute = (client, { text, values }) => __awaiter(this, void 0, void 0, function* () {
            const result = yield client.query(text, values);
            return {
                numRows: result.rowCount,
                rows: result.rows,
                error: false,
                errorMsg: null,
            };
        });
        this.sqlQuery = ({ text, values }, throws = false) => __awaiter(this, void 0, void 0, function* () {
            const client = yield this.pool.connect();
            try {
                const result = yield client.query(text, values);
                return {
                    numRows: result.rowCount,
                    rows: result.rows,
                    error: false,
                    errorMsg: null,
                };
            }
            catch (err) {
                if (throws) {
                    throw err;
                }
                return {
                    numRows: 0,
                    rows: [],
                    error: true,
                    errorMsg: err.message,
                };
            }
            finally {
                client.release();
            }
        });
        this.pool = new pg_1.Pool(config);
        this.setup();
    }
    setup() {
        // Fired when a new Client is connected.
        this.pool.on('connect', client => {
            client.on('error', err => middleware_1.logger.error(`db error: bizarre client error: ${err.message}`, err));
        });
        // Fired when an idle Client emits an error.
        this.pool.on('error', err => middleware_1.logger.error(`db error: idle client error: ${err.message}`, err));
    }
}
exports.default = PostgresDatabase;
//# sourceMappingURL=postgresDatabase.js.map