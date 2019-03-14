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

const getInvalids = (req, validators) => (
  validators.map(validator => {
    const result = validator(req)
    if (result !== true) return result
  })
)

function validateRequest(req, res, next) {
  const validators = routeValidators[req.method][req.path] || []
  const invalids = getInvalids(req, validators).filter(result => result !== undefined)

  if (invalids.length > 0) {
    const [ status, msg ] = invalids[0]
    return res.status(status).send(msg)
  }

  next()
}

module.exports = validateRequest
