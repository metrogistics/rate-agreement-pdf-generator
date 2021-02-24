"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const dbConfig_1 = __importDefault(require("./base/dbConfig"));
const postgresDatabase_1 = __importDefault(require("./base/postgresDatabase"));
const database = new postgresDatabase_1.default(dbConfig_1.default);
exports.db = database;
//# sourceMappingURL=index.js.map