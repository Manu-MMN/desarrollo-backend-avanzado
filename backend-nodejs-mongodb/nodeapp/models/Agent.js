import mongoose, { Schema } from 'mongoose'

// definir el esquema de los agentes
const agentSchema = new Schema({
  name: { type: String, unique: true }, //unique es un índice en sí mismo, por lo que no hace falta añadir un index
  age: { type: Number, min: 18, max: 150, index: true },
  //aquí se nos olvidó meter un índice, por lo que se lo meteremos con el index: true para que tenga índice por owner
  owner: { type: Schema.Types.ObjectId, ref: 'User', index: true },
  avatar: String //ahora esto va a la base de datos junto con todo
}, {
  // collection: 'agentes' // para forzar el nombre de la colección y evitar pluralización
})

// devuelve una lista de agenters
agentSchema.statics.list = function(filter, limit, skip, sort) {

  const query = Agent.find(filter)    //al no tener await, devuelve un objeto query al que podemos añadir cosas
  query.limit(limit)
  query.skip(skip)
  query.sort(sort)
  return query.exec() //este sí devuelve una promesa
}

// creamos el modelo de Agente
const Agent = mongoose.model('Agent', agentSchema)

export default Agent