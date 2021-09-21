FROM node:14

WORKDIR /usr/mock-server

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 1005

CMD ["npm", "run", "serve"]


