import winston from 'winston'
import "winston-daily-rotate-file"
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
}

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${typeof info.message === 'string' ? info.message : JSON.stringify(info.message)}`,
  ),
)

const transports = [
  new winston.transports.Console(),
  new (winston.transports.DailyRotateFile)({
    filename:  "logs/error/%DATE%.log",
    level: 'error',
  }),
  new (winston.transports.DailyRotateFile)({
    level: 'info',
    datePattern: 'DD-MM-YYYY',
    format: winston.format.printf(log => log.message),
    filename: "logs/api/%DATE%.log",
  }),

]

const Logger = winston.createLogger({
  levels,
  format,
  transports,
})



export default Logger
