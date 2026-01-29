/**
 * Runs env validation for a single app: loads .env and runs parseEnv().
 * Called by check-env-all-apps.ts with: bun run scripts/check-env-single-app.ts <env-path> <app-dir>
 * Exits 1 if parseEnv throws (e.g. required var removed from .env but still in zod).
 */

import * as path from "node:path";
import { pathToFileURL } from "node:url";
import { config } from "dotenv";

const envPath = process.argv[2];
const appDir = process.argv[3];

if (!envPath || !appDir) {
  console.error("❌ [check-env] usage: check-env-single-app.ts <env-path> <app-dir>");
  process.exit(1);
}

config({ path: envPath });

try {
  const mod = await import(pathToFileURL(path.join(appDir, "env-type.ts")).href);
  mod.parseEnv();
} catch (err: any) {
  // Extract missing variables from ZodError
  if (err?.issues && Array.isArray(err.issues)) {
    const missingVars = err.issues
      .filter((issue: any) => issue.code === "invalid_type" && issue.received === "undefined")
      .map((issue: any) => issue.path.join("."))
      .filter(Boolean);

    if (missingVars.length > 0) {
      // Output in a format that can be parsed by check-env-all-apps.ts
      console.error(`MISSING_VARS:${missingVars.join(",")}`);
    }
  }
  process.exit(1);
}
