const config = require('../../../config.js')

const INVALID = [401, 'Invalid ID']
const MISSING = [422, 'Missing ID']

function validID(req) {
  const id = parseInt(req.query.id)

  if (id === undefined || isNaN(id)) return MISSING
  if (id < 0 || id > config.IDLIMIT) return INVALID
  if (id === 0) return true // TODO: sort out testing restrictions
}

module.exports = validID
