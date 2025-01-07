import Agent from "../../models/Agent.js"
import createError from 'http-errors'

/**
 * @openapi
 * /api/agents:
 *  get:
 * security:
 * -bearerAuth: []
 *    description: |
 *      Return list of agents
 *      <br />
 *      <b>Examples:</b>
 *      pagination:      http://localhost:3000/api/agents?skip=2&limit=2
 *      sorting:         http://localhost:3000/api/agents?sort=-age%20name
 *      field selection: http://localhost:3000/api/agents?fields=age%20-_id
 *    parameters:
 *      - in: query
 *        name: skip
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: Returns JSON
 */

export async function apiAgentList(req, res, next) {
    try {
        const userId = req.apiUserId
        const filterAge = req.query.age     //http://localhost:3000/api/agents/?age=32
        const filterName = req.query.name     //http://localhost:3000/api/agents/?name=jones
        const limit = req.query.limit     //http://localhost:3000/api/agents?limit=2
        const skip = req.query.skip    //http://localhost:3000/api/agents?limit=2&skip=2   "como máximo 2 por página y te saltas los 2 primeros"
        const sort = req.query.sort    //http://localhost:3000/api/agents?sort=age   ordenar por edad o por lo que sea
        const fields= req.query.fields   // http://localhost:3000/api/agents?fields=name  me devuelve solo los nombre (junto con el id, 
        // si no quieres id sería http://localhost:3000/api/agents?fields=name -_id)


        const filter = { owner: userId }  //así nos aseguramos que solo el owner logado pueda acceder a sus "productos en lista"

        if (filterAge) {
          filter.age = filterAge
        }
    
          if (filterName) {
            filter.name = { $regex: filterName, $options: "i" }; // Insensible a mayúsculas
          }

          const [agents, agentCount] = await Promise.all([    
            Agent.list(filter, limit, skip, sort, fields),//en lugar de const agents = Agent.list(filter, limit, skip, sort, fields)
            Agent.countDocuments(filter)   //te cuenta todos.  esto era const agentCount = Agent.countDocuments(filter)
            //ahora está dentro de promise.all y es un código más eficiente, las saca el paralelo

          ])
           

        res.json({
            results: agents, 
            count: agentCount  //dará el número total abajo
        })
        
    } catch (error) {
        next(error)
    }

}

export async function apiAgentGetOne(req, res, next) {   // meto http://localhost:3000/api/agents/67741dabaf6a66c4f2598534 y me daría el agente con ese id
    try {
        const userId = req.apiUserId
        
        const agentId = req.params.agentId

        const agent = await Agent.findOne({ _id: agentId, owner: userId})

        res.json({ result: agent })

    } catch (error) {
        next(error)
        
    }
}


export async function apiAgentNew(req, res, next){
    try {
        const userId = req.apiUserId
        const agentData = req.body

        //creamos una instancia de agente en memoria

        const agent = new Agent(agentData)
        agent.owner = userId
        agent.avatar = req.file?.filename   //le decimos que este file es opcional

        //guardamos el agente
        const savedAgent = await agent.save()

        res.status(201).json({result: savedAgent})
        
    } catch (error) {
        next(error)
    }
}


export async function apiAgentUpdate(req, res, next) {
    try {
        const userId = req.apiUserId
        const agentId = req.params.agentId
        const agentData = req.body
        agentData.avatar = req.file?.filename //si no han subido fichero imagen, que no falle

        const updatedAgent = await Agent.findOneAndUpdate({ _id: agentId, owner: userId }, agentData, {
            new: true  //por defecto, findByIdAndUpdate actualiza, pero devuelve el estado previo, con new, muestra el actualizado
        })

        res.json({
            result: updatedAgent
        })
        
    } catch (error) {
        next(error)
    }
}


export async function apiAgentDelete(req, res, next) {
    try {
        const userId = req.apiUserId
        const agentId = req.params.agentId

        //validar que el documento que queremos borrar pertenece al usuario

        const agent = await Agent.findOne({_id: agentId})

        //Verificamos que existe
        if (!agent) {
            console.warn(`WARNING - el usuario ${userId} está intentando eliminar un agente inexistente`)
            return next(createError(404)) 
        }
        //agent.owner es un ObjectId y para conmpararlo con un string hay que convertirlo a texto
        //comprobamos la propiedad antes de eliminarlo
        if (agent.owner.toString() !== userId) {
            console.warn(`WARNING - el usuario ${userId} está intentando eliminar que es de otro usuario`)
            return next(createError(401)) 
        }   

        await Agent.deleteOne({ _id: agentId })

        res.json()

    } catch (error) {
        next(error)
    }
}
