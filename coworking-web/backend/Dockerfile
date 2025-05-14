FROM node:18-slim

RUN corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm && pnpm install --frozen-lockfile

COPY . .

EXPOSE 4000

CMD pnpm run migrate && pnpm run seed && pnpm dev
