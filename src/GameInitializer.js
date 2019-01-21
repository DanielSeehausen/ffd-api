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
  console.log('\t...initializing Groups')
  // TODO: this is on find right now instead of create to stop from overwriting. this needs to be flexible for each option in thhe future.
  return Promise.all(
    Array(config.IDLIMIT).fill().map((_, idx) => Group.find(idx+1))
  )
}

function initializeTimeBoard() {
  console.log('\t...initializing TimeBoard')
  // TimeBoard.createAsync()
}

const GameInitializer = {

  initialize: () => {
    return Promise.all([
      initializeCanvas(),
      initializeGroups(),
      initializeTimeBoard()
    ])
  }

}

module.exports = GameInitializer


