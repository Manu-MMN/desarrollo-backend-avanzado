import express from 'express'
import createError from 'http-errors'
import logger from 'morgan'
import cookieParser from 'cookie-parser'   //lector de cookies 
import connectMongoose from './lib/connectMongoose.js'
import * as sessionManager from './lib/sessionManager.js'
import * as homeController from './controllers/homeController.js'
import * as loginController from './controllers/loginController.js'
import * as agentsController from './controllers/agentsController.js'
import upload from "./lib/uploadConfigure.js"
import i18n from './lib/i18nConfigure.js'
import * as languageController from './controllers/languageController.js'
import * as apiAgentsController from './controllers/api/apiAgentsController.js'

await connectMongoose() // top level await
console.log('Conectado a MongoDB.')

const app = express()

app.locals.appName = 'NodeApp'

app.set('views', 'views') // views folder
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json()) // parsear el body que venga en formato JSON
app.use(express.urlencoded({ extended: false })) // parsear el body que venga urlencoded (formularios)
app.use(express.static('public'))
app.use(cookieParser());

/**
 * Api routes
 */
app.get("/api/agents", apiAgentsController.apiAgentList )




/**
 * Website routes
 */

app.use(sessionManager.middleware, sessionManager.useSessionInViews)

app.use(i18n.init)  // decirle a app que utilice el middleware i18n, leerá la cabecerá, verá el idioma que le pida y elegirá en base a ese header
// ejemplo con query string    app.get('/change-locale', languageController.changeLocale);
app.get('/change-locale/:locale', languageController.changeLocale)

// public pages
app.get('/', homeController.index)
app.get('/login', loginController.index)
app.post('/login', loginController.postLogin)
app.all('/logout', loginController.logout)

// private pages
app.get('/agents/new', sessionManager.isLoggedIn, agentsController.index)
app.post('/agents/new', sessionManager.isLoggedIn,upload.single("avatar"), agentsController.postNew)
app.get('/agents/delete/:agentId', sessionManager.isLoggedIn, agentsController.deleteAgent)

// Examples
app.get('/param_in_route/:num?', homeController.paranInRouteExample)
app.get('/param_in_route_multiple/:product/size/:size([0-9]+)/color/:color',
  homeController.paranInRouteMultipleExample
)
app.get('/param_in_query', homeController.paramInQuery)
app.post('/create-example', homeController.createExample)
app.get('/validate-query-example',
  homeController.validateQueryExampleValidations,
  homeController.validateQueryExample
)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  // const err = new Error('404')
  // err.status = 404
  // next(err)
  next(createError(404))
})

// error handler
app.use((err, req, res, next) => {

  // validation errors
  if (err.array) {
    err.message = 'Invalid request: ' + err.array()
      .map(e => `${e.location} ${e.type} ${e.path} ${e.msg}`)
      .join(', ')
    err.status = 422
  }

  res.status(err.status || 500)

  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = process.env.NODEAPP_ENV === 'development' ? err : {}

  // render error view
  res.render('error')
})

export default app