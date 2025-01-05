import Agent from "../../models/Agent.js"


export async function apiAgentList(req, res, next) {
    try {

        const filterAge = req.query.age     //http://localhost:3000/api/agents/?age=32
        const filterName = req.query.name     //http://localhost:3000/api/agents/?name=jones
        const limit = req.query.limit     //http://localhost:3000/api/agents?limit=2
        const skip = req.query.skip    //http://localhost:3000/api/agents?limit=2&skip=2   "como máximo 2 por página y te saltas los 2 primeros"
        const sort = req.query.sort    //http://localhost:3000/api/agents?sort=age   ordenar por edad o por lo que sea
        const fields= req.query.fields


        const filter = { }

        if (filterAge) {
          filter.age = filterAge
        }
    
          if (filterName) {
            filter.name = { $regex: filterName, $options: "i" }; // Insensible a mayúsculas
          }

          const agents = await Agent.list(filter, limit, skip, sort, fields)


        res.json({results: agents })
        
    } catch (error) {
        next(error)
    }

}