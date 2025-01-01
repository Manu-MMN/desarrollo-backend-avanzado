import 'dotenv/config' //dotenv, es un módulo que unifica la ruta de servidor ( en este caso mongoose) (por eso el fichero env)
// de no querer usar donetnv, podía haber ejecutado node--env-file .env server.js   esto va sin librería pero sólo desde node 22
import http from 'node:http'
import debugLib from 'debug'
import app from './app.js'

const debug = debugLib('nodeapp:server')
const port = process.env.PORT || 3000

// create http server
const server = http.createServer(app)

server.on('error', err => console.error(err))
server.on('listening', () => { debug(`Servidor arrancado en puerto ${port}`)})
server.listen(port)