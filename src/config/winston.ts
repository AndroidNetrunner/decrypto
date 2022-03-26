import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const logDir = 'logs';

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
  format: winston.format.combine(
    enumerateErrorFormat(),
    process.env.NODE_ENV === 'development'
      ? winston.format.colorize()
      : winston.format.uncolorize(),
    winston.format.splat(),
    // winston.format.timestamp(),
    winston.format.printf(({ level, message }) => `${level}: ${message}`)
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ['error'],
    }),
    new DailyRotateFile({
      level: 'info',
      datePattern: 'YYYY-MM-DD-HH',
      dirname: logDir,
      filename: `%DATE%.log`,
      maxFiles: 30,
      maxSize: '20m',
      zippedArchive: true,
    }),
    new DailyRotateFile({
      level: 'error',
      datePattern: 'YYYY-MM-DD-HH',
      dirname: `${logDir}/error`,
      filename: `%DATE%.log`,
      maxFiles: 30,
      maxSize: '20m',
      zippedArchive: true,
    }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

export default logger;
