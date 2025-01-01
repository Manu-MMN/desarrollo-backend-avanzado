# NodeApp

## Deploy

### Install dependencies

```sh
npm install
```

On first deploy copy .env.example to env and custumize enviroment variables

```sh
copy .env.example .env
```



 you can run next command to empty the database and create initial data:

```js
npm run initDB
```

## Start

To start in production mode:

```sh
npm start
```

To start in development mode:

```sh
npm run dev
```