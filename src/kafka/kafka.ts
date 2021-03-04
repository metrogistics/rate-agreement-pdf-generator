import { Kafka, logLevel } from 'kafkajs'

const kafka = new Kafka({
    clientId: process.env.KAFKA_CLIENT_ID || 'undefined_client_id',
    brokers: [process.env.KAFKA_HOST || ''],
    // authenticationTimeout: 1000,
    // reauthenticationThreshold: 10000,
    // logLevel: logLevel.DEBUG,
    ssl: true,
    sasl: {
        mechanism: 'plain', // scram-sha-256 or scram-sha-512
        username: process.env.KAFKA_USERNAME || '',
        password: process.env.KAFKA_PASSWORD || ''
    },
})

export default kafka