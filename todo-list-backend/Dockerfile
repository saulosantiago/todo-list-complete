FROM node:14-alpine

RUN mkdir -p /usr/src/api

WORKDIR /usr/src/api

COPY package.json /usr/src/api/

RUN npm install

COPY . /usr/src/api

EXPOSE 3001

CMD [ "npm", "start" ]