FROM oven/bun:latest
WORKDIR /usr/src/app

COPY package*.json ./
RUN bun install --frozen-lockfile --production

COPY . .

RUN bun run build

EXPOSE 3000/tcp

USER bun
CMD ["bun", "./build/index.js"]