FROM node:lts-alpine

WORKDIR /app

COPY . .

RUN npm instal --only=production

RUN npm run build --prefix client

USER : node

CMD ["npm", "start", "--prefix", "server"]

EXPOSE 5000