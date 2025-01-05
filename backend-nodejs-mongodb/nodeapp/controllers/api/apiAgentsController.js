import Agent from "../../models/Agent.js"


export async function apiAgentList(req, res, next) {
    try {

        const filterAge = req.query.age     //http://localhost:3000/api/agents/?age=32
        const filterName = req.query.name     //http://localhost:3000/api/agents/?name=jones
        const limit = req.query.limit     //http://localhost:3000/api/agents?limit=2
        const skip = req.query.skip    //http://localhost:3000/api/agents?limit=2&skip=2   "como máximo 2 por página y te saltas los 2 primeros"
        const sort = req.query.sort    //http://localhost:3000/api/agents?sort=age   ordenar por edad o por lo que sea
        const fields= req.query.fields   // http://localhost:3000/api/agents?fields=name  me devuelve solo los nombre (junto con el id, 
        // si no quieres id sería http://localhost:3000/api/agents?fields=name -_id)


        const filter = { }

        if (filterAge) {
          filter.age = filterAge
        }
    
          if (filterName) {
            filter.name = { $regex: filterName, $options: "i" }; // Insensible a mayúsculas
          }

          const agents = await Agent.list(filter, limit, skip, sort, fields)
          const agentCount = await Agent.countDocuments(filter)  //te cuenta todos


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
        
        const agentId = req.params.agentId

        const agent = await Agent.findById(agentId)

        res.json({ result: agent })

    } catch (error) {
        next(error)
        
    }
}


export async function apiAgentNew(req, res, next){
    try {

        const agentData = req.body

        //creamos una instancia de agente en memoria

        const agent = new Agent(agentData)
        agent.avatar = req.file?.filename   //le decimos que este file es opcional

        //guardamos el agente
        const savedAgent = await agent.save()

        res.status(201).json({result: savedAgent})
        
    } catch (error) {
        next(error)
    }
}