const config = require('./../../../config.js')
const Canvas = require('./Canvas.js')
const Group = require('./Group.js')
const TimeBoard = require('./TimeBoard.js')

// TODO: id should correspond to core, conn should be pre-created to hold links to the various redis tables required
class GameWorker {

  constructor(id, wss) {
    this.id = id
    this.wss = wss
  }

  updateTileTime(x, y, id) {
    const oldTime = TimeBoard.getTile(x, y)
    const newTime = Time.now()
    TimeBoard.setTile(x, y, newTime)
    Group.addTime(id, newTime - oldTime)
  }

  setTile({x, y, hexStr}, id) {
    const idx = this._coordToByteIdx(x, y)
    const int32 = hex6CharToInt32(hexStr)

    Canvas.setTile(x, y, int32)

    Group.incrementWrites(id)

    // if it is a watched tile, it will be in redis' TimeBoad
    if (TimeBoard.get(x, y)) {
      this.updateTileTime(x, y, id)
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

module.exports = GameWorker
