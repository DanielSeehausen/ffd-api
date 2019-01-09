const cluster = require('cluster');

const Supervisor = {

  emit: (msg) => {
    for (const id in cluster.workers) {
      cluster.workers[id].send(msg)
    }
  },

  startWorkers: _ => {
    require('./Worker.js')
  },

  forkWorkers: (cores) => {
    console.log(`\tForking ${cores} workers`)
    for (let i = 0; i < cores; i++) cluster.fork()
  }

}

module.exports = Supervisor
