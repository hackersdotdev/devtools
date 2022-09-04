import type { ErrorRequestHandler } from 'express';

/**
 * Express middleware that logs errors.
 */
export const errorLogger: ErrorRequestHandler = (error, req, _res, next) => {
  req.log.error('Uncaught error:', error);
  next(error);
};
