FROM node:20-slim

RUN apt-get update -y && apt-get install -y openssl

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

RUN npx prisma generate

COPY . .

EXPOSE 3333

CMD [ "sh", "-c", "npx prisma migrate deploy && npm run dev" ]