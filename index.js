const cluster = require('cluster')

const config = require('./config.js')
const GameInitializer = require('./src/GameInitializer.js')
const Supervisor = require('./src/Supervisor.js')

async function start() {
  console.log('\n\nServer starting with config:\n\n', config)

  console.log('\n\nInitializing game state in redis...')
  await GameInitializer.initialize()
  console.log('...finished initializing game state')

  console.log('\n\nStarting Workers...')
  await Supervisor.forkWorkers(config.WORKERCOUNT)
  console.log('...done')
}

cluster.isMaster ? start() : Supervisor.startWorker()

