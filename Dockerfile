FROM node:16.16.0

WORKDIR /server

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8080

CMD ["node", "server.js"]
