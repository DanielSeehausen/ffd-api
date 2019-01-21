const redis = require('redis')
const { promisify } = require('util')
const cluster = require('cluster')

const RedisConn = redis.createClient({'detect_buffers': true})

const workerId = cluster.worker ? `worker: ${cluster.worker.id}` : 'STARTUP'

RedisConn.on('connect', () => { console.log(`\t...${workerId} connected to Redis`) })
RedisConn.on('error', (err) => { console.error(`\t...REDIS CONN FAILED FOR ${workerId}:\n\t${err}`) })

RedisConn.getAsync = promisify(RedisConn.get).bind(RedisConn)
RedisConn.setAsync = promisify(RedisConn.set).bind(RedisConn)

// group adapter
RedisConn.getGroup = id => RedisConn.getAsync(`group-${id}`).then(str => JSON.parse(str))
RedisConn.setGroup = (id, obj) => RedisConn.setAsync(`group-${id}`, JSON.stringify(obj))

module.exports = RedisConn
