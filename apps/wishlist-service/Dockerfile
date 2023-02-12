FROM node:lts-alpine

WORKDIR /app

COPY ./dist/apps/wishlist-service .

ENV PORT=4003

EXPOSE ${PORT}

RUN npm install --omit=dev

CMD node ./main.js
