# syntax=docker/dockerfile:1.7

########################
# STAGE 1 - deps
########################
FROM oven/bun:1.3.0 AS deps
WORKDIR /app

ENV TURBO_TELEMETRY_DISABLED=1

# Copier juste les fichiers nécessaires pour installer les dépendances
COPY package.json bun.lock turbo.json ./
COPY apps/api/package.json apps/api/
COPY packages/trpc/package.json packages/trpc/
COPY packages/typescript-config/package.json packages/typescript-config/
COPY packages/eslint-config/package.json packages/eslint-config/
COPY packages ./packages

# Installer les deps avec cache Bun (pas de --frozen-lockfile pour éviter les erreurs)
RUN --mount=type=cache,target=/root/.bun \
    bun install

########################
# STAGE 2 - build
########################
FROM deps AS build
WORKDIR /app

# Copier uniquement le code qui peut changer selon les watch paths
COPY apps/api ./apps/api
COPY packages/trpc ./packages/trpc
COPY packages/typescript-config ./packages/typescript-config
COPY packages/eslint-config ./packages/eslint-config
# Copier fichiers racines pour que tout changement relance le build
COPY . .

# Build avec cache Turbo et Bun
RUN --mount=type=cache,target=/root/.bun \
    --mount=type=cache,target=/app/.turbo \
    bun run build:api

########################
# STAGE 3 - runtime
########################
FROM oven/bun:1.3.0 AS runtime
WORKDIR /app

ENV NODE_ENV=production

# Copier package.json + lock + turbo.json
COPY package.json bun.lock turbo.json ./

# Copier tout le code nécessaire pour Turbo (apps + packages)
COPY apps ./apps
COPY packages ./packages

# Copier node_modules du build stage
COPY --from=deps /app/node_modules ./node_modules

# Start
CMD ["bun", "run", "start:api"]