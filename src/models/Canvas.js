const config = require('../../config.js')
const hex6CharToInt32 = require('../helpers/hex6CharToInt32.js')
const RedisBufferConn = require('../db/RedisBufferConn.js')

const Canvas = {

  createAsync: () => {

    const width = config.COLUMNS
    const height = config.ROWS
    const bytes = height * width * 4 // alpha + rgb channels reason for *4)

    const arrayBuffer = new ArrayBuffer(bytes)

    const int32View = new Uint32Array(arrayBuffer)
    int32View.fill(hex6CharToInt32('222222'))

    RedisBufferConn.setAsync('canvas', Buffer.from(arrayBuffer)).then(Canvas.print)
  },


  setTile: (x, y, int32) => {},

  getBoard: () => RedisBufferConn.getAsync('canvas'),

  print: () => {
    RedisBufferConn.getAsync('canvas').then(b => {
      console.log(Array.prototype.slice.call(b, 0))
    })
  }
}

module.exports = Canvas
