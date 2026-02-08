# syntax=docker/dockerfile:1.7

########################
# STAGE 1 - dependencies
########################
FROM oven/bun:1.3.0 AS deps
WORKDIR /app

ENV TURBO_TELEMETRY_DISABLED=1

# Fichiers racines essentiels
COPY package.json bun.lock turbo.json ./

# Dépendances internes (packages)
COPY packages/trpc/package.json packages/trpc/
COPY packages/typescript-config/package.json packages/typescript-config/
COPY packages/eslint-config/package.json packages/eslint-config/
COPY packages ./packages

# Dépendances Bun avec cache
RUN --mount=type=cache,target=/root/.bun \
    bun install

########################
# STAGE 2 - build
########################
FROM deps AS build
WORKDIR /app

# Copier le code API et packages pour build
COPY apps/api ./apps/api
COPY packages/trpc ./packages/trpc
COPY packages/typescript-config ./packages/typescript-config
COPY packages/eslint-config ./packages/eslint-config

# Build API avec Turbo + Bun cache
RUN --mount=type=cache,target=/root/.bun \
    --mount=type=cache,target=/app/.turbo \
    bun run build:api

########################
# STAGE 3 - runtime
########################
FROM oven/bun:1.3.0 AS runtime
WORKDIR /app

ENV NODE_ENV=production

# Copier le build final de l'API
COPY --from=build /app/apps/api/dist ./dist
COPY --from=deps /app/node_modules ./node_modules

# Copier package.json API pour Bun/Turbo
COPY apps/api/package.json ./

# Copier les fichiers racines qui pourraient affecter Turbo/Bun
COPY package.json bun.lock turbo.json ./

# Start API
CMD ["bun", "run", "start:api"]