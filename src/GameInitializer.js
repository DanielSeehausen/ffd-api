const config = require('./../config.js')
const Canvas = require('./models/Canvas.js')
const Group = require('./models/Group.js')
const TimeBoard = require('./models/TimeBoard.js')
const RedisConn = require('./db/RedisConn.js')

class GameInitializer {

  static initializeCanvas() {
    console.log('\t...initializing Canvas')
    return Canvas.createAsync()
  }

  static initializeGroups() {
    console.log('\t...initializing Groups')
    // TODO: initialize redis Groups
  }

  static initializeTimeBoard() {
    console.log('\t...initializing TimeBoard')
    // TODO: initialize redis TimeBoard
  }

  static initialize() {
    return Promise.all([
      this.initializeCanvas(),
      this.initializeGroups(),
      this.initializeTimeBoard()
    ])
  }

}

module.exports = GameInitializer
