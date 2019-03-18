const config = require('./../config.js')
const Canvas = require('./models/Canvas.js')
const Group = require('./models/Group.js')
const TimeBoard = require('./models/TimeBoard.js')
const RedisConn = require('./db/RedisConn.js')

function initializeCanvas() {
  console.log('\t...initializing Canvas')
  Canvas.create()
}

async function initializeGroups() {
  console.log('\t...initializing or finding Groups')
  return Promise.all(
    Array(config.IDLIMIT).fill().map((_, idx) => Group.findOrCreate(idx+1))
  )
}

function initializeTimeBoard() {
  console.log('\t...initializing TimeBoard')
  // TimeBoard.createAsync()
}

const GameInitializer = {

  initialize: () => (
    Promise.all([
      initializeCanvas(),
      initializeGroups(),
      initializeTimeBoard()
    ])
  )

}

module.exports = GameInitializer


