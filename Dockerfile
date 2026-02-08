# syntax=docker/dockerfile:1.7

########################
# STAGE 1 - dependencies
########################
FROM oven/bun:1.3.0 AS deps
WORKDIR /app

ENV TURBO_TELEMETRY_DISABLED=1

# Copier les fichiers racines essentiels pour Turbo
COPY package.json bun.lock turbo.json ./

# Copier uniquement les packages partagés nécessaires
COPY packages/trpc/package.json packages/trpc/
COPY packages/typescript-config/package.json packages/typescript-config/
COPY packages/eslint-config/package.json packages/eslint-config/
COPY packages ./packages

# Installer les dépendances avec cache Bun
RUN --mount=type=cache,target=/root/.bun \
    bun install

########################
# STAGE 2 - build
########################
FROM deps AS build
WORKDIR /app

# Copier le code API et les packages partagés
COPY apps/api ./apps/api
COPY packages/trpc ./packages/trpc
COPY packages/typescript-config ./packages/typescript-config
COPY packages/eslint-config ./packages/eslint-config

# Build API avec Turbo + cache Bun et Turbo
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

# Copier les packages node_modules
COPY --from=deps /app/node_modules ./node_modules

# Copier package.json API pour Bun/Turbo
COPY apps/api/package.json ./

# Copier les fichiers racines qui peuvent influencer Turbo/Bun
COPY package.json bun.lock turbo.json ./

# Lancer l'API
CMD ["bun", "run", "start:api"]