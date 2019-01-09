const cluster = require('cluster');

const config = require('./config.js')
const Supervisor = require('./src/cluster/Supervisor.js')
const Game = require('./src/Game.js')

async function start() {
  console.log('\n\nServer starting with config:\n\n', config)

  console.log('\n\nInitializing game state in redis...')
  Game.initialize()
  console.log('...done')

  console.log('\n\nStarting Workers...')
  await Supervisor.forkWorkers(config.WORKERCOUNT)
  console.log('...done')

  // console.log('\n\nStarting Websocket Server...')
  // 3. start websocket server
  // console.log('...done')
}

if (cluster.isMaster) {
  start()
} else {
  Supervisor.startWorker()
}
