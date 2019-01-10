const config = require('./../../config.js')
const Canvas = require('../models/Canvas.js')
const Group = require('../models/Group.js')
const TimeBoard = require('../models/TimeBoard.js')

class GameManager {

  constructor(id, wss) {
    this.id = id
    this.wss = wss
  }

  _updateTileTime(x, y, groupId) {
    const oldTime = TimeBoard.getTile(x, y)
    const newTime = Time.now()
    TimeBoard.setTile(x, y, newTime)
    Group.addTime(groupId, newTime - oldTime)
  }

  setTile({x, y, hexStr}, groupId) {
    const idx = this._coordToByteIdx(x, y)
    const int32 = hex6CharToInt32(hexStr)

    Canvas.setTile(x, y, int32)

    Group.incrementWrites(groupId)

    // if it is a watched tile, it will be in redis' TimeBoard
    if (TimeBoard.get(x, y)) {
      this._updateTileTime(x, y, groupId)
    }

  }

  getAllGroupInfo() {
    // TODO: implement
  }

  emitTile(x, y, hexStr) {
    this.wss.emit(x, y, hexStr)
  }

  getBoard() {
    // not sure how to do this yet with redis-ml
  }
}

module.exports = GameManager
