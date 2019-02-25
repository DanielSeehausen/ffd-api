const config = require('../../config.js')
const hex6CharToInt32 = require('../helpers/hex6CharToInt32.js')
const RedisCanvasConn = require('../db/RedisCanvasConn.js')
const RedisConn = require('../db/RedisConn.js')

function createArrayBuffer() {
    const width = config.COLUMNS
    const height = config.ROWS
    const bytes = height * width * 4 // alpha + rgb channels reason for *4)
    return new ArrayBuffer(bytes)
}

function coordToByteIndex(y, x) {
  return (config.COLUMNS * y + x)
}

const Canvas = {

  create: () => {
    const arrayBuffer = createArrayBuffer()
    const int32View = new Uint32Array(arrayBuffer)
    int32View.fill(hex6CharToInt32('000000'))
    const buffer = Buffer.from(arrayBuffer)

    return RedisCanvasConn.setCanvas(buffer)
  },


  setTile: (x, y, hexColorStr) => {
    const int32Value = hex6CharToInt32(hexColorStr)
    const offset = coordToByteIndex(y, x)
    console.log(int32Value, offset)
    return RedisCanvasConn.setTile(offset, int32Value)
  },

  getCanvas: () => RedisCanvasConn.getCanvas(),

  print: () => {
    RedisCanvasConn.getCanvas()
      .then(buffer => console.log(Array.prototype.slice.call(buffer, 0)))
  }
}

module.exports = Canvas
