// NOTE: this is the adapter for canvas -- note the 'return buffers' in the client initialization
// instead of 'return_buffers', i believe we could use 'detect_buffers' and not have a separate redis client for the board (combine them into RedisConn.js) but I am in a rush and pushing that refactoring to another time
//
// THIS SHOULD ONLY BE USED FOR ACCESSING/MODIFYING THE CANVAS!

const redis = require('redis')
const { promisify } = require('util')
const cluster = require('cluster')

const client = redis.createClient({'return_buffers': true})

const workerId = cluster.worker ? `worker: ${cluster.worker.id}` : 'STARTUP'

client.on('connect', () => { console.log(`\t...${workerId} connected to Redis Canvas`) })
client.on('error', (err) => { console.error(`\t...REDIS CANVAS CONN FAILED FOR ${workerId}:\n\t${err}`) })

client.getAsync = promisify(client.get).bind(client)
client.setAsync = promisify(client.set).bind(client)
client.sendCommandAsync = promisify(client.send_command).bind(client)

// canvas adapter
const KEY = 'canvas'
client.getCanvas = _ => client.getAsync(KEY)
client.setCanvas = buffer => client.setAsync(KEY, buffer)
client.setTile = (offset, int32Val) => (
  client.sendCommandAsync('bitfield', ['canvas', 'SET', 'u32', `#${offset}`, int32Val])
)

module.exports = client
