import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as winston from 'winston';
import { MongoDBTransportInstance } from 'winston-mongodb';
const {
  MongoDB,
}: { MongoDB: MongoDBTransportInstance } = require('winston-mongodb');

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

export default function WinstonLogsConfig() {
  return {
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp(),
      addAppNameFormat(),
      winston.format.json(),
      // Format the metadata object
      winston.format.metadata({
        fillExcept: ['message', 'level', 'timestamp', 'label'],
      }),
    ),
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
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.ms(),
          nestWinstonModuleUtilities.format.nestLike('Nest'),
        ),
      }),
    ],
  };
}
