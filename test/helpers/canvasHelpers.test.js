const reverse8CharHexStr = require('../../src/helpers/reverse8CharHexStr.js')
const hex6CharToInt32 = require('../../src/helpers/hex6CharToInt32.js')

test('reverse8CharHexStr reverses an 8 character hex str', () => {
  const str = '213141FF'
  expect(reverse8CharHexStr(str)).toBe('FF413121')
})

test('hex6CharToInt32 reverses a 6 char hex str and adds an alpha value in the process', () => {
  const str = '010203'
  expect(hex6CharToInt32(str)).toBe(16909311)
})
