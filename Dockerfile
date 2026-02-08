# syntax=docker/dockerfile:1.7

########################
# STAGE 1 - deps
########################
FROM oven/bun:1.3.0 AS deps
WORKDIR /app
ENV TURBO_TELEMETRY_DISABLED=1

# Copier package.json, lockfile et turbo.json racine
COPY package.json bun.lock turbo.json ./

# Copier package.json des workspaces pour Bun (Turbo)
COPY apps/api/package.json apps/api/
COPY packages/trpc/package.json packages/trpc/
COPY packages/typescript-config/package.json packages/typescript-config/
COPY packages/eslint-config/package.json packages/eslint-config/

# Copier tout le code packages
COPY packages ./packages

# Installer deps avec cache Bun
RUN --mount=type=cache,target=/root/.bun bun install --frozen-lockfile

########################
# STAGE 2 - build
########################
FROM deps AS build
WORKDIR /app

# Copier le code qui change selon watch paths
COPY apps/api ./apps/api
COPY packages/trpc ./packages/trpc
COPY packages/typescript-config ./packages/typescript-config
COPY packages/eslint-config ./packages/eslint-config

# Build Turbo/API avec cache Turbo + Bun
RUN --mount=type=cache,target=/root/.bun \
    --mount=type=cache,target=/app/.turbo \
    bun run build:api

########################
# STAGE 3 - runtime
########################
FROM oven/bun:1.3.0 AS runtime
WORKDIR /app
ENV NODE_ENV=production

# Copier le build final
COPY --from=build /app/.turbo /app/.turbo
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/package.json /app/package.json
COPY --from=build /app/bun.lock /app/bun.lock
COPY --from=build /app/turbo.json /app/turbo.json
COPY --from=build /app/apps/api/dist ./apps/api/dist

# Start via script racine (start:api)
CMD ["bun", "run", "start:api"]