npm i
npm run dev

DOCKER:
- docker-compose up -d
- docker inspect <DATABASE_CONTAINER_ID> | grep "IPAddress"

PRISMA:
- npx prisma generate 
- npx prisma migrate dev --name init
