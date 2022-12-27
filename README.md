npm i
npm run dev

DOCKER:
- docker-compose up -d
- docker inspect <DATABASE_CONTAINER_ID> | grep "IPAddress"
- In pgdmin, set ip address as the container ip

PRISMA:
- npx prisma generate 
- npx prisma migrate dev --name init
