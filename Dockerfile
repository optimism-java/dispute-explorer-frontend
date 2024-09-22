FROM node:20.16.0-alpine AS deps
RUN apk update && apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install

FROM node:20.16.0-alpine AS builder
ARG NEXT_PUBLIC_IS_BASE="false"
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm install -g pnpm && export NEXT_PUBLIC_IS_BASE=${NEXT_PUBLIC_IS_BASE} && pnpm build

FROM nginx
COPY --from=builder /app/out /usr/share/nginx/html
RUN apt-get update && apt-get install -y jq && apt-get clean
COPY ./nginx.conf.example /etc/nginx/nginx.conf
COPY ./start.sh /start.sh 
RUN chmod +x /start.sh
CMD ["/bin/bash", "/start.sh"]