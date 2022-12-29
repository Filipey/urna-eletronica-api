TESTS:
```js
npm i
npm run test
```

DOCKER SETUP:
```sh
docker-compose build --no-cache
docker-compose up -d

# Postgres on port 5433
# Pgadmin4 on port 8010
# App on port 3001
```

```sh
# To configure pgadmin4 connection, grep the container id 
docker ps -a
docker inspect <DATABASE_CONTAINER_ID> | grep "IPAddress"
```
In pgadmin4 interface, use the environment values to login
Create a new Server with any name and set up the connection with the <DATABASE_CONTAINER_ID>
Set the user and password with the environment values

PRISMA:
```sh
# If is your first time running the container
docker ps -a
# Grep the address of the container urna-eletronica-api_app
docker exec -it <CONTAINER_IP> sh
npx prisma migrate deploy && npx prisma db seed
exit
```
