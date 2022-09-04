import type { ErrorRequestHandler } from "express";

/**
 * Middleware to handle uncaught errors.
 */
export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  // Express requires you to delegate to the default express error handler
  // if you have already started writing the requst (res.headersSent).
  if (res.headersSent) {
    req.log.warn("Encountered error after response headers sent", error);
    return next(error);
  }

  // Get the status from the error is present
  const status: number = typeof error.status === "number" ? error.status : 500;

  // In development, send a detailed error message.
  if (process.env.NODE_ENV !== "production") {
    res.status(status).json({
      error: error.message,
      stack: error.stack,
    });
  } else {
    res.status(status).send("Internal server error");
  }
};
