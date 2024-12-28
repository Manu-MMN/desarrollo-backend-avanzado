import mongoose from 'mongoose'

mongoose.connection.on('error', err => {
  console.log('Error de conexión', err)
})

export default function connectMongoose() {
  return mongoose.connect('mongodb://127.0.0.1:27017/cursonode')
    .then(mongoose => mongoose.connection)
}

// export default async function connectMongoose() {
//   await mongoose.connect('mongodb://127.0.0.1:27017/cursonode')
//   return mongoose.connection
// }