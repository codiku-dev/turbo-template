/**
 * Generated from .env.local.development. You can regenerate it with the npm run generate-env-types script.
 * Regenerated when .env.local.development changes (generate-env-types script).
 */
import { z } from "zod";

export const envSchema = z.object({
  DATABASE_URL: z.string(),
  PORT: z.string(),
  POSTGRES_DB: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_PORT: z.string(),
  POSTGRES_USER: z.string(),
  TRPC_URL: z.string(),
  BETTER_AUTH_SECRET: z.string(),
});


export type Env = z.infer<typeof envSchema>;

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Env { }
  }
}

export function parseEnv(): Env {
  return envSchema.parse(process.env);
}
