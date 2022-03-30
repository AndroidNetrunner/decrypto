FROM node:16-alpine AS builder

WORKDIR /app

COPY ./frontend/package*.json ./

RUN npm ci

COPY ./frontend/ .

RUN npm run build

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY ./nginx/nginx.conf /etc/nginx

COPY ./nginx/conf /etc/nginx

COPY --from=builder /app/dist .

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]