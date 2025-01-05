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

# API

Base URL: http://localhost:3000/api


### Agent list

GET /api/agents

```json
{
    "results": [
        {
            "_id": "676d9c008736f8d11425cf0b",
            "name": "Smith",
            "age": 31,
            "owner": "676d9c008736f8d11425cf05",
            "__v": 0
        },
        // ...
    ],
    "count": 5
}

```