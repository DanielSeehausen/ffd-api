const config = require('../../../config.js')

// holds a single value of ms
const TimeBoard = {

  setTile: (x, y, time) => {
    conn.timeBoard.set(`{y}-{x}`, time)
  }

  getTile: (x, y) => (
    conn.timeBoard.get(`{y}-{x}`)
  )

}
