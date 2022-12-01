import * as dotenv from "dotenv";
import { z } from "zod";

export { z };

export class EnvVars<T extends z.ZodTypeAny> {
  readonly schema: T;

  constructor(schema: T, dotenvConfig?: dotenv.DotenvConfigOptions) {
    // Initialize dotenv to read environment variables from .env file
    dotenv.config(dotenvConfig);
    this.schema = schema;
  }

  get(): z.infer<T> {
    // Parse and validate environment variables from process.env
    const result = this.schema.safeParse(process.env);

    // Return strongly typed environment variables
    if (result.success) return result.data;

    const message = result.error.message;
    throw new Error(`Missing required environment variables: ${message}`);
  }
}
