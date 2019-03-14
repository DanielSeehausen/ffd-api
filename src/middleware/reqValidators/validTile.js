const config = require('../../../config.js')

const INVALID = [422, 'Bad Request! Check your tile value']

function isNumeric(num=undefined) {
  return !isNaN(num)
}

function validTile(req) {
  const [x, y] = [req.query.x, req.query.y]

  const valid = (
    isNumeric(x) &&
    isNumeric(y) &&
    x < config.COLUMNS &&
    x > -1 &&
    y < config.ROWS &&
    y > -1
  )

  return valid ? true : INVALID
}

module.exports = validTile
