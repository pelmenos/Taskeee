FROM oven/bun:1.2.3-alpine AS builder

WORKDIR /app

COPY ./package.json ./package.json
COPY ./bun.lock ./bun.lock

RUN bun install --ignore-scripts --frozen-lockfile --no-cache

COPY . /app

RUN bun run build

FROM nginx:1.23-alpine AS runner

COPY .deploy/nginx.conf /etc/nginx/conf.d/default.conf

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
