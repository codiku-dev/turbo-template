# syntax=docker/dockerfile:1.7

FROM oven/bun:1.3.0 AS deps
WORKDIR /app

ENV TURBO_TELEMETRY_DISABLED=1

# Fichiers racine
COPY package.json bun.lock turbo.json ./

# Packages internes
COPY packages/trpc/package.json packages/trpc/
COPY packages/typescript-config/package.json packages/typescript-config/
COPY packages/eslint-config/package.json packages/eslint-config/
COPY packages ./packages

RUN --mount=type=cache,target=/root/.bun bun install

########################
# Build
########################
FROM deps AS build
WORKDIR /app

COPY apps/api ./apps/api
COPY packages/trpc ./packages/trpc
COPY packages/typescript-config ./packages/typescript-config
COPY packages/eslint-config ./packages/eslint-config

RUN --mount=type=cache,target=/root/.bun \
    --mount=type=cache,target=/app/.turbo \
    bun run build:api

########################
# Runtime
########################
FROM oven/bun:1.3.0 AS runtime
WORKDIR /app

ENV NODE_ENV=production

COPY --from=build /app/apps/api/dist ./dist
COPY --from=deps /app/node_modules ./node_modules
COPY apps/api/package.json ./
COPY package.json bun.lock turbo.json ./

CMD ["bun", "run", "start:api"]