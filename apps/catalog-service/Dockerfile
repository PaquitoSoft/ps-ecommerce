FROM node:lts-alpine

WORKDIR /app

COPY ./dist/apps/catalog-service .

ENV PORT=4001

EXPOSE ${PORT}

RUN npm install --omit=dev

CMD node ./main.js
