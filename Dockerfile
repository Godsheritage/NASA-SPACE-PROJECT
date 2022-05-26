FROM node:lts-alpine

WORKDIR /app

COPY package.json ./

COPY client/package.json client/
RUN npm run install-client --only=production

COPY server/package.json server/
RUN npm run install-server --only=production

COPY client/ client/
# RUN npm run build --prefix client

COPY server/ server/

COPY server/dists server/public

# USER : node

CMD ["npm", "run" , "server" ]

EXPOSE 5000