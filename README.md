# Ivi-like streaming service

This is a NextJS-based streaming service SPA. The App uses Kinopoisk API as data source.  
There are collections of movies that you can filter, sort and even edit genres and movie names or delete them(as admin).
You can browse through movie pages, view movie cast and read all available information about each movie and its crew.

## **Watch demo record of the app:**

 [![Watch demo record](https://img.youtube.com/vi/HwDlF19e-wM/hqdefault.jpg)](https://youtu.be/HwDlF19e-wM):


**\*To log in as administrator use the following credentials:**<br>

```sh
email: admin@admin.com
password: root
```

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
$ npm run build

$ npm start
```

## Server side:

Install dependancies using:

```bash
$ npm install
```

Start the services:

```bash

$ docker-compose build

$ docker-compose up
```

Swagger:

```bash
http://localhost:6125/api/docs
```

Parse data using swagger endpoint:

```bash
http://localhost:6125/admin/films/parsing
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
