const hex6CharToInt32 = require('../helpers/hex6CharToInt32.js')
const redis = require('redis')
const RedisConn = require('../db/RedisConn.js')

const Canvas = {

  createAsync: () => {
    return RedisConn.setAsync('canvas', 'init canvas value')
  },

  print: async () => {
    const res = await RedisConn.getAsync('canvas')
    console.log(res)
  },

  setTile: (x, y, int32) => {
    RedisConn.set(`{y}-{x}`, int32)
  },

  getBoard: () => {
    // TODO: implement
  }

}

module.exports = Canvas
