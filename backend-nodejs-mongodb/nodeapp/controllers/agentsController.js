import createError from 'http-errors'
import Agent from '../models/Agent.js'

export function index(req, res, next) {
  res.render('new-agent')
}

export async function postNew(req, res, next) {
  try {
    const userId = req.session.userId
    const { name, age } = req.body

    // TODO validaciones

    // creo una instancia de agente en memoria
    const agent = new Agent({
      name,
      age,
      owner: userId
    })

    // la guardo en base de datos
    await agent.save()

    res.redirect('/')
  } catch (err) {
    next(err)
  }
}

export async function deleteAgent(req, res, next) {
  const userId = req.session.userId
  const agentId = req.params.agentId

  // validar que el elemento que queremos borrar es propidad
  // del usuario logado!!!!!
  const agent = await Agent.findOne({ _id: agentId })

  // verificar que existe
  if (!agent) {
    console.warn(`WARNING - el usuario ${userId} está intentando eliminar un agente inexistente`)
    return next(createError(404, 'Not found'))
  }

  if (agent.owner.toString() !== userId) {
    console.warn(`WARNING - el usuario ${userId} está intentando eliminar un agente de otro usuario`)
    return next(createError(401, 'Not authorized'))
  }

  await Agent.deleteOne({ _id: agentId })

  res.redirect('/')

}