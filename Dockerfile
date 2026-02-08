# syntax=docker/dockerfile:1.7

########################
# STAGE 1 - dependencies
########################
FROM oven/bun:1.3.0 AS deps
WORKDIR /app

ENV TURBO_TELEMETRY_DISABLED=1

# Copier tous les fichiers du repo pour que Turbo voit tous les workspaces
COPY . .

# Installer les dépendances Bun avec cache
RUN --mount=type=cache,target=/root/.bun \
    bun install

########################
# STAGE 2 - build
########################
FROM deps AS build
WORKDIR /app

# Build uniquement l'API
RUN --mount=type=cache,target=/root/.bun \
    --mount=type=cache,target=/app/.turbo \
    bun run build:api

########################
# STAGE 3 - runtime
########################
FROM oven/bun:1.3.0 AS runtime
WORKDIR /app

ENV NODE_ENV=production

# Copier le build final et node_modules
COPY --from=build /app/apps/api/dist ./dist
COPY --from=build /app/node_modules ./node_modules

# Copier package.json de l’API pour Bun/Turbo
COPY apps/api/package.json ./

# Start API
CMD ["bun", "run", "start:api"]