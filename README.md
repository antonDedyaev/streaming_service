# Ivi-like streaming service

This is a NextJS-based streaming service SPA. The App uses Kinopoisk API as data source.  
There are collections of movies that you can filter, sort and even edit genres and movie names or delete them(as admin).
You can browse through movie pages, view movie cast and read all available information about each movie and its crew.

## Install and use:

Clone the repository using:

```sh
$ git clone https://github.com/antonDedyaev/streaming_service.git
```

## Client side:

Install dependancies using:

```sh
$ npm install
```

Start the app in dev environment:

```sh
$ npm run dev
```

Start the app in prod environment:

```sh
$ npm start
```

## Server side:

Install dependancies using:

```bash
$ npm install
```

Start the services:

```bash

# start with docker in watch mode
$ docker-compose up
```

```bash
# start microservices in watch mode
$ npm run start:dev microservices

# start service films in watch mode
$ npm run start:dev films

# start service genresnames in watch mode
$ npm run start:dev genresnames

# start service genres in watch mode
$ npm run start:dev genres

# start service countriesnames in watch mode
$ npm run start:dev countriesnames

# start service countries in watch mode
$ npm run start:dev countries

# start service persons in watch mode
$ npm run start:dev persons

# start service videos in watch mode
$ npm run start:dev videos

# start service new-auth in watch mode
$ npm run start:dev new-auth

# start service comments in watch mode
$ npm run start:dev comments
```

### Used frameworks and tools:

- Typescript
- NextJS / Redux-toolkit
- Sass
- React testing library / Jest
- next-i18next
- Storybook
- Nest
- Docker
- Swagger
