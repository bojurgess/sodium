import { default as pino } from 'pino';
import { default as pretty } from 'pino-pretty';

const dev = process.env.NODE_ENV === 'development';
const log = pino(dev ? pretty({ colorize: true }) : undefined);

console.log = log.info.bind(log);
console.error = log.error.bind(log);
console.warn = log.warn.bind(log);
console.info = log.info.bind(log);
