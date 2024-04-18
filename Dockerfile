FROM node:20.11.1

# Instalando Redis
RUN apt-get update && apt-get install -y redis-server

WORKDIR /usr/src/app

COPY . .

COPY ./.env.production ./.env
COPY redis.conf /usr/local/etc/redis/redis.conf

RUN yarn
RUN yarn build

# Expondo a porta do Redis
EXPOSE 6379

# Iniciando tanto o aplicativo Node.js quanto o servidor Redis
CMD ["redis-server", "/usr/local/etc/redis/redis.conf" && "yarn", "start:prod"]
