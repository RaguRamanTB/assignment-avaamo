FROM node:20.12.1

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]