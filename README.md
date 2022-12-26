npm i
npm run dev

DOCKER: docker-compose up -d

PRISMA:
- npx prisma generate 
- npx prisma migrate dev --name init