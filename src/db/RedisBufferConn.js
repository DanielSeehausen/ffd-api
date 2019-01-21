const redis = require('redis')
const { promisify } = require('util')
const cluster = require('cluster')

const RedisBufferConn = redis.createClient({'return_buffers': true})

const workerId = cluster.worker ? `worker: ${cluster.worker.id}` : 'STARTUP'

RedisBufferConn.on('connect', () => { console.log(`\t...${workerId} connected to Buffer Redis`) })
RedisBufferConn.on('error', (err) => { console.error(`\t...REDIS CONN FAILED FOR ${workerId}:\n\t${err}`) })

RedisBufferConn.getAsync = promisify(RedisBufferConn.get).bind(RedisBufferConn)
RedisBufferConn.setAsync = promisify(RedisBufferConn.set).bind(RedisBufferConn)

module.exports = RedisBufferConn
