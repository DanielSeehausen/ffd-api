const config = require('./../config.js')
const Canvas = require('./models/Canvas.js')
const Group = require('./models/Group.js')

const GameManager = {

  setTile: ({x, y, hexStr}, groupId) => {
    Canvas.setTile(x, y, hexStr)
  },

  getGroup: (id) => Group.find(id),

  getAllGroups: () => (
    Promise.all(
      Array(config.IDLIMIT).fill().map((_, idx) => Group.find(idx+1))
    )
  ),

  emitTile: (x, y, hexStr) => {
    // wss.emit(x, y, hexStr)
  },

  getCanvas: () => Canvas.getCanvas()
}

module.exports = GameManager
