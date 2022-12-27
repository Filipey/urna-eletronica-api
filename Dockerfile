FROM node:alpine

WORKDIR /user/app

COPY package.json ./

RUN npm install

COPY . /user/app/

RUN npx prisma migrate dev name --init

EXPOSE 3000

CMD ["npm", "run", "dev"]
