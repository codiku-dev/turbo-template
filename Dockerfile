# syntax=docker/dockerfile:1.7

########################
# STAGE 1 - dependencies !
########################
FROM oven/bun:1.3.0 AS deps
WORKDIR /app

ENV TURBO_TELEMETRY_DISABLED=1

# Copier fichiers principaux pour installer les deps
COPY package.json bun.lock turbo.json ./
COPY apps/api/package.json apps/api/
COPY packages/trpc/package.json packages/trpc/
COPY packages/typescript-config/package.json packages/typescript-config/
COPY packages/eslint-config/package.json packages/eslint-config/
COPY packages ./packages

# Installer les deps avec cache Bun
RUN --mount=type=cache,target=/root/.bun \
    bun install --frozen-lockfile

########################
# STAGE 2 - build
########################
FROM deps AS build
WORKDIR /app

# Copier uniquement le code qui peut changer selon tes watch paths
COPY apps/api ./apps/api
COPY packages/trpc ./packages/trpc
COPY packages/typescript-config ./packages/typescript-config
COPY packages/eslint-config ./packages/eslint-config

# Build avec ton script existant et cache Turbo + Bun
RUN --mount=type=cache,target=/root/.bun \
    --mount=type=cache,target=/app/.turbo \
    bun run build:api

########################
# STAGE 3 - runtime
########################
FROM oven/bun:1.3.0 AS runtime
WORKDIR /app

ENV NODE_ENV=production

# Copier le build final et les deps
COPY --from=build /app/apps/api/dist ./dist
COPY --from=deps /app/node_modules ./node_modules
COPY apps/api/package.json ./

# Démarrage
CMD ["bun", "run", "start:api"]