import Transport from "winston-transport";

/** Copied from https://github.com/winstonjs/triple-beam/blob/master/index.js */
const LEVEL = Symbol.for("level");

/**
 * A simple transport to send Winston logs to the console.
 * This is required because Winston's built in console transport doesn't work
 * with the NodeJS+Chrome debugger.
 * @see https://github.com/winstonjs/winston/issues/1544#issuecomment-499362387
 */
export class SimpleConsoleTransport extends Transport {
  private getLogMethod(level: string) {
    if (level === "debug") {
      return console.debug;
    } else if (level === "info") {
      return console.info;
    } else if (level === "critical" || level === "error") {
      return console.error;
    } else if (level === "warning") {
      return console.warn;
    } else {
      return console.log;
    }
  }

  override log(info: any, callback: any): void {
    setImmediate(() => this.emit("logged", info));
    const logMethod = this.getLogMethod(info[LEVEL]);
    const date = new Date();
    if (info.logStack) {
      logMethod(
        `${date.getHours()}:${date.getMinutes()}`,
        info.message,
        info.logStack
      );
    } else {
      const { message, level: _level, traceId: _traceId, ...rest } = info;
      const data: any = {};
      Object.entries(rest).forEach(([key, value]) => {
        if (typeof key === "string") {
          data[key] = value;
        }
      });
      logMethod(
        `[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}]`,
        message,
        data
      );
    }
    if (callback) {
      callback();
    }
  }
}
