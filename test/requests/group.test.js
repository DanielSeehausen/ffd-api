const fetch = require('node-fetch')

const testEndpoint = require('../../config.js').TESTENDPOINT

let config;
beforeAll(async () => {
  config = await fetch(testEndpoint + '/config').then(res => res.json())
})

const groupsEndpoint = testEndpoint + '/group?id=0'

describe('GET /group', () => {

  test('returns a 200 response', async () => {
    const res = await fetch(groupsEndpoint + '?id=0')
    expect(res.status).toBe(200)
  })

  describe('JSON payload', () => {

    let groups;
    beforeAll(async () => {
      groups = await fetch(groupsEndpoint + '?id=0').then(res => res.json())
    })

    test('returns an object as JSON', () => {
      expect(typeof groups).toBe('object')
    })

    test('is an array', () => {
      expect(Array.isArray(groups)).toBe(true)
    })

    test('has the correct amount of groups', () => {
      expect(groups.length).toBe(config.IDLIMIT)
    })

    test('has required keys and values', () => {
      const propTypes = {
        id: 'number',
        color: 'string',
        writes: 'number',
        errors: 'number',
        time: 'number'
      }

      const sampleGroup = groups[0]
      for (const key in propTypes)
        expect(typeof sampleGroup[key]).toBe(propTypes[key])
    })
  })
})


function getGroup(id) {
  return fetch(`${testEndpoint}/group/${id}?id=0`)
}

describe('GET /group/:id', () => {

  test('returns a 200 response', async () => {
    const res = await getGroup(1)
    expect(res.status).toBe(200)
  })

  describe('JSON payload', () => {

    test('returns correctly structured object as JSON', async () => {
      const group = await getGroup(1).then(res => res.json())
      expect(typeof group).toBe('object')

      const propTypes = {
        id: 'number',
        color: 'string',
        writes: 'number',
        errors: 'number',
        time: 'number'
      }

      for (const key in propTypes)
        expect(typeof group[key]).toBe(propTypes[key])
    })
  })
})
