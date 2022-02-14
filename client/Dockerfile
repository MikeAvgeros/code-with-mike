FROM node:16.14-alpine

WORKDIR /app/

COPY package.json /app/

RUN npm install

COPY . /app/

EXPOSE 3000

CMD npm start