import * as winston from 'winston';
import { MongoDBTransportInstance } from 'winston-mongodb';
export default function WinstonLogsConfig(): {
    level: string;
    format: winston.Logform.Format;
    handleExceptions: boolean;
    handleRejections: boolean;
    transports: (MongoDBTransportInstance | winston.transports.ConsoleTransportInstance)[];
};
