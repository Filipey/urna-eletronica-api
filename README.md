TESTS:
- npm i
- npm run test

DOCKER:
- docker-compose up -d
- docker inspect <DATABASE_CONTAINER_ID> | grep "IPAddress"
- In pgdmin, set ip address as the container ip

PRISMA:
```sh
# If is your first time running the container
docker ps -a
# Grep the address of the container urna-eletronica-api_app
docker exec -it <CONTAINER_IP> sh
npx prisma migrate deploy && npx prisma db seed
exit
```
