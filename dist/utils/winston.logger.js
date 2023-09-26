"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nest_winston_1 = require("nest-winston");
const winston = require("winston");
const { MongoDB, } = require('winston-mongodb');
const addAppNameFormat = winston.format((info) => {
    console.log(info);
    info = {
        ...info,
        ...info.stack[0],
    };
    delete info.stack;
    delete info.context;
    return info;
});
function WinstonLogsConfig() {
    return {
        level: 'info',
        format: winston.format.combine(winston.format.timestamp(), addAppNameFormat(), winston.format.json(), winston.format.metadata({
            fillExcept: ['message', 'level', 'timestamp', 'label'],
        })),
        handleExceptions: true,
        handleRejections: true,
        transports: [
            new winston.transports.MongoDB({
                db: process.env.LOG_DATABASE_CONNECTION_STRING,
                collection: 'infinity_logs',
                options: { useUnifiedTopology: true },
                format: winston.format.combine(winston.format.json()),
            }),
            new winston.transports.Console({
                format: winston.format.combine(winston.format.timestamp(), winston.format.ms(), nest_winston_1.utilities.format.nestLike('Nest')),
            }),
        ],
    };
}
exports.default = WinstonLogsConfig;
//# sourceMappingURL=winston.logger.js.map