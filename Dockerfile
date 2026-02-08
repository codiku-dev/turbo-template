# File: Dockerfile

########################
# STAGE 1 - dependencies
########################
FROM oven/bun:1.3.0 AS deps
WORKDIR /app

ENV TURBO_TELEMETRY_DISABLED=1

# Fichiers root pour Turbo/Bun
COPY package.json bun.lock turbo.json ./

# Packages nécessaires
COPY packages/trpc/package.json packages/trpc/
COPY packages/typescript-config/package.json packages/typescript-config/
COPY packages/eslint-config/package.json packages/eslint-config/
COPY packages ./packages

# Installer les dépendances avec cache
RUN --mount=type=cache,target=/root/.bun \
    bun install

########################
# STAGE 2 - build
########################
FROM deps AS build
WORKDIR /app

# Copier code source API + packages partagés
COPY apps/api ./apps/api
COPY packages/trpc ./packages/trpc
COPY packages/typescript-config ./packages/typescript-config
COPY packages/eslint-config ./packages/eslint-config

# Build API
RUN --mount=type=cache,target=/root/.bun \
    --mount=type=cache,target=/app/.turbo \
    bun run build:api

########################
# STAGE 3 - runtime
########################
FROM oven/bun:1.3.0 AS runtime
WORKDIR /app

ENV NODE_ENV=production

# Installer OpenSSL pour Prisma
RUN apt-get update -y && apt-get install -y openssl

# Copier build final + node_modules
COPY --from=build /app/apps/api/dist ./apps/api/dist
COPY --from=deps /app/node_modules ./node_modules

# Copier package.json API et fichiers root
COPY apps/api/package.json ./apps/api/package.json
COPY package.json bun.lock turbo.json ./

# Copier dossier Prisma depuis ton chemin source
COPY apps/api/src/infrastructure/prisma ./apps/api/prisma

# Lancer le script racine depuis la racine
WORKDIR /app
CMD ["bun", "run", "start:api"]