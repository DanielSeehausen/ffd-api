const cluster = require('cluster');

const config = require('./config.js')
const Supervisor = require('./src/cluster/Supervisor.js')

function start() {
  console.log('\n\nServer starting with config:\n\n', config)

  console.log('\n\nCreating Tables...')
  // 1. create necessary tables
  console.log('\t...done')

  console.log('\n\nStarting Workers...')
  Supervisor.forkWorkers(config.WORKERCOUNT)

  console.log('\t...done')

  console.log('\n\nStarting Websocket Server...')
  // 3. start websocket server
  console.log('\t...done')
}

if (cluster.isMaster) {
  start()
} else {
  Supervisor.startWorkers()
}


