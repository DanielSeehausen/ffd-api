const cluster = require('cluster');

const Supervisor = {

  emit: (msg) => {
    for (const id in cluster.workers) {
      cluster.workers[id].send(msg)
    }
  },

  startWorker: () => {
    require('./Router.js')
  },

  forkWorkers: async (cores) => {
    for (let idx = 1; idx <= cores; idx++) {
      console.log(`\tStarting Worker ${idx}...`)
      await cluster.fork()
    }
  }

}

module.exports = Supervisor
