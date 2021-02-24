"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    user: process.env.POSTGRES_USER || 'undefined_user',
    host: process.env.POSTGRES_ENDPOINT || 'undefined_host',
    database: process.env.POSTGRES_DB || 'undefined_db',
    password: process.env.POSTGRES_PASS || 'undefined_pass',
    port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
    max: 20,
    min: 5,
    idleTimeoutMillis: 1000,
    connectionTimeoutMillis: 5 * (60 * 1000),
};
exports.default = config;
//# sourceMappingURL=dbConfig.js.map