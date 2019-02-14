const config = require('../../config.js')
const validID = require('./reqValidators/validID.js')
const validColor = require('./reqValidators/validColor.js')
const validTile = require('./reqValidators/validTile.js')

/* this is strictly for validating routes that have specific parameter
 * requirements. If a request url isn't present here, it doesn't mean 404
 * instead, it means it doesn't require any special validation
 */

const routeValidators = {
  POST: {
    '/tile': [validID, validTile, validColor]
  },
  GET: {
    '/canvas': [validID],
    '/group': [validID],
    '/tile': [validTile, validID],
    '/netstat': [],
  }
}

function validRequest(req, res, next) {
  // TODO: remove these logs before prod
  console.log(req.method, req.path)
  const validators = routeValidators[req.method][req.path] || []
  const invalids = validators.filter(validator => !validator(req))

  if (invalids.length > 0) {
    console.error('invalids:')
    invalids.forEach(x => console.error(x.name))
    return res.status(422).send('Bad Request! Check your id, coordinates, color value, etc.')
  }

  next()
}

module.exports = validRequest
