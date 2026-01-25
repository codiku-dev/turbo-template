/**
 * Generated from .env.local.development. Do not edit manually.
 * Regenerated when .env.local.development changes (generate-env-types script).
 */
import { z } from "zod";

export const envSchema = z.object({
  NEXT_PUBLIC_TRPC_URL: z.string(),
  TRPC_URL: z.string(),
});

export type Env = z.infer<typeof envSchema>;

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Env {}
  }
}

export function parseEnv(): Env {
  return envSchema.parse(process.env);
}
