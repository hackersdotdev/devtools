import winston from "winston";
import type { LogEntry } from "winston";

// Constants for GCP logging
// @see https://cloud.google.com/logging/docs/reference/v2/rest/v2/LogEntry
const traceKey = "logging.googleapis.com/trace";
const labelsKey = "logging.googleapis.com/labels";
const SeverityLookup: Record<string, string> = {
  default: "DEFAULT",
  silly: "DEFAULT",
  verbose: "DEBUG",
  debug: "DEBUG",
  http: "NOTICE",
  info: "INFO",
  warn: "WARNING",
  error: "ERROR",
};

/**
 * Format a Winston error for GCP structured logging.
 * @see https://cloud.google.com/logging/docs/reference/v2/rest/v2/LogEntry
 */
const gcpFormat = winston.format((info: LogEntry) => {
  let {
    level,
    message,
    stack,
    httpRequest,
    timestamp,
    traceId,
    labels,
    ...metadata
  } = info;
  // Get the GCP severity from the Winston level
  const severity = SeverityLookup[level] || SeverityLookup.default;

  // Add the Error stack to the message if it exists so error reporting picks it up.
  if (stack) {
    message += (message ? " " : "") + stack;
  }

  return removeUndefinedAndNullValues({
    level,
    severity,
    message,
    httpRequest,
    timestamp,
    [traceKey]: traceId,
    [labelsKey]: labels,
    metadata,
  });
});

/**
 * Winston transport for GCP structured logging.
 * @see https://cloud.google.com/logging/docs/reference/v2/rest/v2/LogEntry
 */
export function gcpTransport() {
  return new winston.transports.Console({
    format: winston.format.combine(gcpFormat(), winston.format.json()),
  });
}

function removeUndefinedAndNullValues<T extends Record<string, unknown>>(
  obj: T
) {
  Object.keys(obj).forEach(
    (key) => (obj[key] === undefined || obj[key] === null) && delete obj[key]
  );
  return obj;
}
