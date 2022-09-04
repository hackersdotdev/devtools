import type { JsonObject } from 'type-fest';

// Inspired by:
// - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
// - https://rclayton.silvrback.com/custom-errors-in-node-js
// - https://github.com/stripe/stripe-node/blob/7e1b9f7c5a17e4fee00c1eee43e83f6a26c29a31/lib/Error.js
// - https://blog.dennisokeeffe.com/blog/2020-08-07-error-tracing-with-sentry-and-es6-classes

export type ErrorOptions = {
  /** HTTP status code to be used by Express error handling. */
  status?: number;
  /** The original error that caused this error. */
  cause?: unknown;
  /** Additional context to be added to the error. */
  context?: JsonObject;
};

export class BaseError extends Error {
  status?: number;
  context?: JsonObject;

  constructor(message: string, opts: ErrorOptions = {}) {
    if (opts.cause) {
      // @ts-ignore not sure why TS can't handle this
      super(message, { cause: opts.cause });
    } else {
      super(message);
    }

    // Ensure the name of this error is the same as the class name
    this.name = this.constructor.name;

    // Set stack trace to caller
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }

    // Status is used for Express error handling
    if (opts.status) {
      this.status = opts.status;
    }

    // Add additional context to the error
    if (opts.context) {
      this.context = opts.context;
    }
  }
}

export class BadRequestError extends BaseError {
  constructor(message: string, opts: ErrorOptions = {}) {
    opts.status = opts.status || 400;
    super(message, opts);
    Error.captureStackTrace(this, this.constructor);
  }
}

export class UnauthorizedError extends BaseError {
  constructor(message: string, opts: ErrorOptions = {}) {
    opts.status = opts.status || 401;
    super(message, opts);
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ForbiddenError extends BaseError {
  constructor(message: string, opts: ErrorOptions = {}) {
    opts.status = opts.status || 403;
    super(message, opts);
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends BaseError {
  constructor(message: string, opts: ErrorOptions = {}) {
    opts.status = opts.status || 404;
    super(message, opts);
    Error.captureStackTrace(this, this.constructor);
  }
}

export class TooManyRequestsError extends BaseError {
  constructor(message: string, opts: ErrorOptions = {}) {
    opts.status = opts.status || 429;
    super(message, opts);
    Error.captureStackTrace(this, this.constructor);
  }
}

export class InternalServerError extends BaseError {
  constructor(message: string, opts: ErrorOptions = {}) {
    opts.status = opts.status || 500;
    super(message, opts);
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotImplementedError extends BaseError {
  constructor(message: string, opts: ErrorOptions = {}) {
    opts.status = opts.status || 501;
    super(message, opts);
    Error.captureStackTrace(this, this.constructor);
  }
}
