const config = require('./../../config.js')
const Canvas = require('../models/Canvas.js')
const Group = require('../models/Group.js')
const TimeBoard = require('../models/TimeBoard.js')
const hex6CharToInt32 = require('../helpers/hex6CharToInt32.js')

function updateTileTime(x, y, groupId) {
  const oldTime = TimeBoard.getTile(x, y)
  const newTime = Time.now()
  TimeBoard.setTile(x, y, newTime)
  Group.addTime(groupId, newTime - oldTime)
}

function coordToByteIdx(x, y) {
  return (config.COLUMNS * y + x)
}

const GameManager = {

  setTile: ({x, y, hexStr}, groupId) => {
    const idx = coordToByteIdx(x, y)
    const int32 = hex6CharToInt32(hexStr)

    Canvas.setTile(x, y, int32)

    Group.incrementWrites(groupId)

    if (TimeBoard.get(x, y)) {
      this.updateTileTime(x, y, groupId)
    }
  },

  getAllGroupInfo: () => {
    // TODO: implement
  },

  emitTile: (x, y, hexStr) => {
    // wss.emit(x, y, hexStr)
  },

  getBoard: () => {
    // not sure how to do this yet with redis-ml
  }
}

module.exports = GameManager
