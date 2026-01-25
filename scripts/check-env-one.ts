/**
 * Runs env validation for one app: loads .env and runs parseEnv().
 * Called by check-env.ts with: bun run scripts/check-env-one.ts <env-path> <app-dir>
 * Exits 1 if parseEnv throws (e.g. required var removed from .env but still in zod).
 */

import * as path from "node:path";
import { pathToFileURL } from "node:url";
import { config } from "dotenv";

const envPath = process.argv[2];
const appDir = process.argv[3];

if (!envPath || !appDir) {
  console.error("[check-env] usage: check-env-one.ts <env-path> <app-dir>");
  process.exit(1);
}

config({ path: envPath });

const mod = await import(pathToFileURL(path.join(appDir, "env-type.ts")).href);
mod.parseEnv();
