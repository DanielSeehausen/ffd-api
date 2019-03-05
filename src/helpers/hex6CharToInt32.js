// const reverse8CharHexStr = require('./reverse8CharHexStr.js')
// redis reverses endian from what we were using before, so I think this is no longer required?

function hex6CharToInt32(hexStr) {
  const hex8Char =  hexStr + 'FF'// FF is the alpha channel

  return parseInt(hex8Char, 16)
}

module.exports = hex6CharToInt32
