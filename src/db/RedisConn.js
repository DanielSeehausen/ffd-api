const redis = require('redis')
const { promisify } = require('util')
const cluster = require('cluster')

const RedisConn = redis.createClient()

const workerId = cluster.worker ? cluster.worker.id : 'SUPERVISOR'

RedisConn.on('connect', () => { console.log(`\t...worker: ${workerId} connected to Redis`) })
RedisConn.on('error', (err) => { console.error(`\t...REDIS CONN FAILED FOR ${workerId}:\n\t${err}`) })

RedisConn.getAsync = promisify(RedisConn.get).bind(RedisConn)
RedisConn.setAsync = promisify(RedisConn.set).bind(RedisConn)

RedisConn.getGroup = id => RedisConn.getAsync(`group-${id}`)
RedisConn.setGroup = (id, obj) => RedisConn.setAsync(`group-${id}`, JSON.stringify(obj))

module.exports = RedisConn
