const INVALID = [422, 'Bad Request! Check your color value']

function isHex(str) {
  return /^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/i.test(str)
}

function validColor(req) {
  const str = req.query.c || ''
  return (str.length === 6 && isHex(str)) ? true : INVALID
}

module.exports = validColor
