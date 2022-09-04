import winston from 'winston';
import { SimpleConsoleTransport } from './console-transport.js';
import { gcpTransport } from './gcp-transport.js';

/*
 * Create a Winston logger for use in GCP.
 * Sends logs to GCP via console and Logtail.
 */
export const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  transports:
    process.env.NODE_ENV !== 'production'
      ? [new SimpleConsoleTransport()]
      : [gcpTransport()],
});
