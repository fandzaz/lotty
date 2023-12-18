FROM node:14 AS build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install -g serve
RUN npm install


COPY . .
RUN npm run build

CMD ["npm","run","start"]