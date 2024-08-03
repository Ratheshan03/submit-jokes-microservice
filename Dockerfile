FROM node:20-alpine AS development
WORKDIR /usr/src/app

COPY --chown=node:node package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

COPY --chown=node:node . .
USER node


FROM node:20-alpine AS build
WORKDIR /usr/src/app
COPY --chown=node:node package*.json ./
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules
COPY --chown=node:node . .
RUN npm run build

RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile --production && yarn cache clean --force; \
  elif [ -f package-lock.json ]; then npm ci -f --only=production && npm cache clean --force; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile && pnpm store prune --force; \
  else echo "Lockfile not found." && exit 1; \
  fi
  
USER node


FROM node:20-alpine AS production
ENV NODE_ENV production
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist
EXPOSE 3001
CMD [ "node", "dist/main.js" ]
