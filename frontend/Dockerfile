FROM node:20-slim

ENV NEXT_TELEMETRY_DISABLED 1

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "dev" ]