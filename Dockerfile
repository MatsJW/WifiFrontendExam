FROM node:18-slim

WORKDIR /app

COPY .npmrc package.json ./

RUN npm install
RUN npm install esbuild@0.25.4 --save-dev

RUN npm i -g serve

COPY . .

RUN npm run build-only

EXPOSE 3000

CMD [ "serve", "-s", "dist" ]