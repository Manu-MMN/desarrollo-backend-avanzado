import readline from 'node:readline'
import connectMongoose from './lib/connectMongoose.js'
import Agent from './models/Agent.js'
import User from './models/User.js'

const connection = await connectMongoose()
console.log('Connected to MongoDB:', connection.name)

const questionResponse = await ask('Are you sure you want to empty the database and create initial data?')
if (questionResponse.toLowerCase() !== 'yes') {
  console.log('Operation aborted.')
  process.exit()
}

await initUsers()
await initAgents()

connection.close()

async function initAgents() {
  // delete all agents
  const deleteResult = await Agent.deleteMany()
  console.log(`Deleted ${deleteResult.deletedCount} agents.`)

  const [admin, user1] = await Promise.all([
    User.findOne({ email: 'admin@example.com' }),
    User.findOne({ email: 'user1@example.com' }),
  ])

  // create initial agents
  const insertResult = await Agent.insertMany([
    { name: 'Smith', age: 31, owner: admin._id },
    { name: 'Brown', age: 42, owner: admin._id },
    { name: 'Jones', age: 23, owner: user1._id }
  ])
  console.log(`Created ${insertResult.length} agents.`)
}

async function initUsers() {
  // delete all users
  const deleteResult = await User.deleteMany()
  console.log(`Deleted ${deleteResult.deletedCount} users.`)

  // create initial users
  const insertResult = await User.insertMany([
    { email: 'admin@example.com', password: await User.hashPassword('1234') },
    { email: 'user1@example.com', password: await User.hashPassword('1234') },
  ])
  console.log(`Created ${insertResult.length} users.`)
}

function ask(questionText) {
  return new Promise((resolve, reject) => {
    const consoleInterface = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })
    consoleInterface.question(questionText, answer => {
      consoleInterface.close()
      resolve(answer)
    })
  })
}