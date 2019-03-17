const fetch = require('node-fetch')

const testEndpoint = require('../../config.js').TESTENDPOINT
const configEndpoint = testEndpoint + '/config'

describe('GET /config', () => {

  test('returns a 200 response', async () => {
    const res = await fetch(configEndpoint).then(res => res)
    expect(res.status).toBe(200)
  })

  describe('returns an accurate payload', () => {

    let config;
    beforeAll(async () => {
      config = await fetch(configEndpoint).then(res => res.json())
    })

    test('returns an object as json', () => {
      expect(typeof config).toBe('object')
    })

    test('returns properties required for the testing suite', () => {
      const requiredProperties = ['ROWS', 'COLUMNS', 'WSPORT', 'IDLIMIT']
      expect(Object.keys(config)).toEqual(expect.arrayContaining(requiredProperties))
    })
  })
})
