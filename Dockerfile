FROM node:alpine

WORKDIR /user/app

COPY package.json ./

COPY prisma /user/app/prisma

RUN npm install

COPY . /user/app/


EXPOSE 3000

CMD ["npm", "run", "dev"]
