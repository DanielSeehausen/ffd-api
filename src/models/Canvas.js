const hex6CharToInt32 = require('../helpers/hex6CharToInt32.js')

const Canvas = {

  setTile: (x, y, int32) => {
    conn.canvas.set(`{y}-{x}`, int32)
  },

  getBoard: () => {
    // TODO: implement
  }

}
