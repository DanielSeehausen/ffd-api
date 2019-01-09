const redis = require('redis')
const cluster = require('cluster')
const conn = redis.createClient()

conn.on('connect', () => { console.log(`...worker: ${cluster.worker.id} connected to Redis`) })
conn.on('error', (err) => { console.error(`...REDIS CONN FAILED FOR ${cluster.worker.id}:\n\t${err}`) })

module.exports = conn
