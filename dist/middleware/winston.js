"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = require("winston");
// const isLocal = process.env.NODE_ENV === 'local'
const createTransports = () => {
    const consoleTransport = new winston_1.transports.Console();
    // Future state is to enable other loggers for AWS/Cloud system if necessary
    // if (isLocal) {
    //     return [ consoleTransport ]
    // }
    return [consoleTransport];
};
// Format for console logging.
const myFormat = winston_1.format.printf(info => `[${info.level}]:${info.timestamp} => ${info.message}`);
// Configure the info console logger.
const infoLogger = winston_1.createLogger({
    level: 'info',
    // label: 'Global',
    transports: createTransports(),
    format: winston_1.format.combine(winston_1.format.timestamp(), myFormat),
    exitOnError: true,
});
exports.logger = infoLogger;
//# sourceMappingURL=winston.js.map