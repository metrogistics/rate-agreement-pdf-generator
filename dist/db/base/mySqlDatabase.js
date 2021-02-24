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
const mysql_1 = __importDefault(require("mysql"));
const middleware_1 = require("../../middleware");
const database_1 = __importDefault(require("./database"));
class MySqlDatabase extends database_1.default {
    constructor(config) {
        super();
        this.sqlQuery = ({ text, values }) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.pool.getConnection(((err, connection) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    connection.query({ sql: text, values: values }, (error, results) => {
                        connection.release();
                        if (error) {
                            resolve({
                                numRows: 0,
                                rows: [],
                                error: true,
                                errorMsg: error.message,
                            });
                            return;
                        }
                        resolve({
                            numRows: results.length,
                            rows: results,
                            error: false,
                            errorMsg: null
                        });
                    });
                }));
            });
        });
        this.pool = mysql_1.default.createPool(config);
        this.setup();
    }
    setup() {
        // Fired when a new Client is connected.
        this.pool.on('connection', (client) => {
            client.on('error', (err) => middleware_1.logger.error(`db error: bizarre client error: ${err.message}`, err));
        });
        // Fired when an idle Client emits an error.
        this.pool.on('error', err => middleware_1.logger.error(`db error: idle client error: ${err.message}`, err));
    }
}
exports.default = MySqlDatabase;
//# sourceMappingURL=mySqlDatabase.js.map