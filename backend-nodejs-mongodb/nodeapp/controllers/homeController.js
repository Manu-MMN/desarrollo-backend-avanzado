import assert from 'node:assert'
import { query, validationResult } from 'express-validator'
import Agent from '../models/Agent.js'

// GET /
export async function index(req, res, next) {

  const now = new Date()
  const userId = req.session.userId
  const filterAge = req.query.age     //http://localhost:3000/?age=32
  const filterName = req.query.name     //http://localhost:3000/?name=jones
  const limit = req.query.limit     //http://localhost:3000/?limit=2
  const skip = req.query.skip    //http://localhost:3000/?limit=2&skip=2   "como máximo 2 por página y te saltas los 2 primeros"
  const sort = req.query.sort    //http://localhost:3000/?sort=age   ordenar por edad o por lo que sea

  // Gracias a que en app.js usamos i18n como middleware, el propio res. tiene funcionalizad para internacionalizar
  res.locals.nombre = `'<script>alert("${res.__('code injection')}")</script>'`
  res.locals.esPar = (now.getSeconds() % 2) === 0
  res.locals.segundoActual = now.getSeconds()

  if (userId) {

    const filter = { owner: userId }

    if (filterAge) {
      filter.age = filterAge
    }

      if (filterName) {
        filter.name = { $regex: filterName, $options: "i" }; // Insensible a mayúsculas
      }
    
    res.locals.agents = await Agent.list(filter, limit, skip, sort)
  }

  res.render('home')
}

// GET /param_in_route/44
export function paranInRouteExample(req, res, next) {
  const num = req.params.num

  res.send('Received ' + num)
}

// GET /param_in_route_multiple/camiseta/size/37/color/red
export function paranInRouteMultipleExample(req, res, next) {
  const product = req.params.product
  const size = req.params.size
  const color = req.params.color

  res.send(`Received ${product} size ${size} color ${color}`)
}

// GET /param_in_query?size=S&color=blue
export function paramInQuery(req, res, next) {
  const size = req.query.size
  const color = req.query.color

  res.send(`Received size ${size} color ${color}`)
}

// POST /create-example
export function createExample(req, res, next) {
  const item = req.body.item

  // validation
  assert(item, 'item is required')

  res.send('Received ' + item)
}

export const validateQueryExampleValidations = [
  query('param1')
    .isLength({ min: 4 })
    .withMessage('min 4 characters'),
  query('param2')
    .isNumeric()
    .withMessage('must be numeric'),
  query('param3')
    .custom(value => value === '42')
    .withMessage('must be 42')
]
export function validateQueryExample(req, res, next) {
  validationResult(req).throw()
  const param1 = req.query.param1
  const param2 = req.query.param2


  res.send(`Validated ${param1} ${param2}`)
}