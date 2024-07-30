FROM node:20.16.0-alpine AS deps
RUN apk update && apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install

FROM node:20.16.0-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm install -g pnpm && pnpm build && pnpm install --production 

FROM node:20.16.0-alpine
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
EXPOSE 3000
ENV PORT 3000

CMD ["node_modules/.bin/next", "start"]