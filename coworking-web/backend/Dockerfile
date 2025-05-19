FROM node:18-slim

RUN corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
COPY knexfile.js ./ 

RUN pnpm install --frozen-lockfile

COPY . .

EXPOSE 4000

CMD pnpm dev

