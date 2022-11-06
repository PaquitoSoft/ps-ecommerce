FROM node:lts-alpine

WORKDIR /app

COPY ./dist/apps/checkout-service .

ENV PORT=4002

EXPOSE ${PORT}

RUN npm install --omit=dev

CMD node ./main.js
