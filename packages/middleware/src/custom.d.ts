import type { logger } from '@hckrs/logs';

// Modify Express Request object based on middleware
declare global {
  namespace Express {
    interface Request {
      log: ReturnType<typeof logger>;
      traceId: string;
    }
  }
}
