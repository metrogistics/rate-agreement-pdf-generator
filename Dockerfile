FROM node:14-alpine AS Builder

WORKDIR /app
COPY . .
RUN npm install
RUN ./node_modules/typescript/bin/tsc

FROM node:14-alpine

ARG NODE_ENV=production
ENV NODE_ENV ${NODE_ENV}

WORKDIR /app
COPY --from=Builder /app/dist .
COPY package.json .
COPY yarn.lock .
RUN yarn install --production
EXPOSE 3000
CMD NODE_ENV=${NODE_ENV} node server.js
