FROM node:16-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci && npm i typescript

COPY . .

ENTRYPOINT ["npm", "run", "start"] 