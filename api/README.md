TESTS:
```js
npm i
npm run test
```

DOCKER SETUP:
```sh
chmod +x .docker/entrypoint.sh # Linux
attrib +x .docker/entrypoint.sh # Windows
docker-compose build --no-cache
docker-compose up -d

# Postgres on port 5433
# App on port 3001
```

PRISMA:
```sh
# If is your first time running the container
# Grep the ID of the container urna-eletronica-api_app
docker ps -a

docker-compose exec app bash
npx prisma migrate deploy && npx prisma db seed

# If you wanna see the data in prisma studio run
npx prisma studio
exit
```

POSTMAN:
https://www.postman.com/filipeyzi/workspace/tp-eng-software-ii/overview
