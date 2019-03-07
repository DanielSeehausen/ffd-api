const config = require('../../../config.js')

function validID(req) {
  const id = parseInt(req.query.id)
  if (id === 0) return true // todo: sort out testing restrictions
  
  return (isNaN(id) || (id < 0 || id > config.IDLIMIT)) ? false : true
}

module.exports = validID
