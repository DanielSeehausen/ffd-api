const cluster = require('cluster');
const os = require('os');

const config = require('./config')
const cpus = os.cpus().length;

if (cluster.isMaster) {

  for (let i = 0; i < cpus; i++) {
    cluster.fork();
  }
  console.log(`\n\n ${cpus} workers loaded with config:\n\n`, config, '\n\n')
  for (const id in cluster.workers) {
    cluster.workers[id].send('test')
  }
} else {
  require('./src/worker/index.js')
}
