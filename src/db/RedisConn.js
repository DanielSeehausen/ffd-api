const redis = require('redis')
const { promisify } = require('util')
const cluster = require('cluster')

const client = redis.createClient({'detect_buffers': true})

const workerId = cluster.worker ? `worker: ${cluster.worker.id}` : 'STARTUP'

client.on('connect', () => { console.log(`\t...${workerId} connected to Redis`) })
client.on('error', (err) => { console.error(`\t...REDIS CONN FAILED FOR ${workerId}:\n\t${err}`) })

client.getAsync = promisify(client.get).bind(client)
client.setAsync = promisify(client.set).bind(client)
client.setRangeAsync = promisify(client.setrange).bind(client)

// group adapter TODO: this can be updated for hset/hget
client.getGroup = id => client.getAsync(`group-${id}`).then(str => JSON.parse(str))
client.setGroup = (id, obj) => client.setAsync(`group-${id}`, JSON.stringify(obj))

module.exports = client
