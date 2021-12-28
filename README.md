# Docker Prisma Prod

In this repo, we go over the best practices of dockerizing a Prisma + Next.js application. Check out the original blog post at [Codemochi](https://codemochi.com).

## Commands:

### Setting up the .env

The `.env` needs to have its DATABASE_URL variable set and possibly the `CMC_PRO_API_KEY` if we want to pull updated cryptocurrency prices. If we don't set `CMC_PRO_API_KEY` it will populate using static values.

```.env
DATABASE_URL=file:dev.db
CMC_PRO_API_KEY=0000-000-000-0000-000
```

### Running locally

Now that our `.env` has been set up, we should install all the npm dependencies using yarn:

```
yarn
```

Next, we can build the prisma client with `yarn run prisma:generate` and if we'd like, perform a migration against our database using `yarn run prisma:migrate`.

```
yarn run prisma:generate
yarn run prisma:migrate
```

For local development, the only thing to do is to run:

```
yarn run dev
```

This will allow you to actively change code and get the hot-code reloading features of Next.js. When we are ready to build for production we can run:

```
docker-compose build
docker-compose up
```

Due to the volume mapping in the `docker-compose.yml` file, we will map in the same `dev.db` file we use outside of docker which should create a seamless environment of ensuring our app works in and out of a docker environment. For actual production purposes we would likely like to migrate this over to using postgres or mysql connectors. You should be able to get that to work by changing over the `datasource` piece of the `schema.prisma` file to the appropriate connector.
