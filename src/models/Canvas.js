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
    // TODO: move default color value to config
    const defaultColorValue = parseInt('FF000000', 16)
    int32View.fill(defaultColorValue) // hex6CharToInt32 helper not used because setting initial binary data requires alpha channel to be first. Now, when the data is read from redis in the get canvas request, it will come out '000000FF'. TL;DR: initial set from arrayBuffer is little endian, thereafter single tiles are set big endian
    const buffer = Buffer.from(arrayBuffer)

    return RedisCanvasConn.setCanvas(buffer)
  },


  setTile: (x, y, hexColorStr) => {
    const int32Value = hex6CharToInt32(hexColorStr)
    const offset = coordToByteIndex(y, x)

    return RedisCanvasConn.setTile(offset, int32Value)
  },

  getCanvas: () => RedisCanvasConn.getCanvas(),

  print: () => {
    RedisCanvasConn.getCanvas()
      .then(buffer => console.log(Array.prototype.slice.call(buffer, 0)))
  }
}

module.exports = Canvas
