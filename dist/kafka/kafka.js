"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const kafkajs_1 = require("kafkajs");
const kafka = new kafkajs_1.Kafka({
    clientId: process.env.KAFKA_CLIENT_ID || 'undefined_client_id',
    brokers: [process.env.KAFKA_HOST || ''],
    // authenticationTimeout: 1000,
    // reauthenticationThreshold: 10000,
    // logLevel: logLevel.DEBUG,
    ssl: true,
    sasl: {
        mechanism: 'plain',
        username: process.env.KAFKA_USERNAME || '',
        password: process.env.KAFKA_PASSWORD || ''
    },
});
exports.default = kafka;
//# sourceMappingURL=kafka.js.map