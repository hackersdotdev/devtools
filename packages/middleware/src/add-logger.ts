import type { RequestHandler, Request } from 'express';
import { logger } from '@hckrs/logs';

/**
 * Express middleware that attaches a child logger to the request.
 */
export const addLogger: RequestHandler = (req, _res, next) => {
  const traceId = getGcpTrace(req);

  // Create a logger for the request.
  const log = logger.child({
    labels: { route: req?.route?.path },
    traceId,
  });

  // Add the logger and traceId to the request.
  req.log = log;
  req.traceId = traceId;

  next();
};

/**
 * Get the GCP tract id from the request.
 * Adding this to logs helps GCP group logs from the same request.
 */
function getGcpTrace(req: Request): string {
  let traceId = '';
  const traceHeader = req.get('X-Cloud-Trace-Context');
  const project =
    process.env.GOOGLE_CLOUD_PROJECT || process.env.GCLOUD_PROJECT;
  if (traceHeader && project) {
    const [trace] = traceHeader.split('/');
    traceId = `projects/${project}/traces/${trace}`;
  }
  return traceId;
}
