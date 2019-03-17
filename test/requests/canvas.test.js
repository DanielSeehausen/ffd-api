const fetch = require('node-fetch')

const testEndpoint = require('../../config.js').TESTENDPOINT
const canvasEndpoint = testEndpoint + '/canvas?id=0'

let config;
beforeAll(async () => {
  config = await fetch(testEndpoint + '/config').then(res => res.json())
})

function fetchCanvas() {
  return fetch(canvasEndpoint).then(res => res.arrayBuffer())
}

describe('GET /canvas', () => {

  test('returns a 200 response', async () => {
    const res = await fetch(canvasEndpoint)
    expect(res.status).toBe(200)
  })

  test('returns a 422 response when no id argument is provided', async () => {
    const fetchCanvasEndpoint = () => fetch('http://localhost:3000/canvas').then(res => res)
    const res = await fetchCanvasEndpoint()

    expect(res.status).toBe(422)
  })

  test('returns a 401 response when an invalid id argument is provided for a group that does not exist', async () => {
    const fetchCanvasEndpoint = () => fetch('http://localhost:3000/canvas?id=%2D1').then(res => res)
    const res = await fetchCanvasEndpoint()

    expect(res.status).toBe(401)
  })

  test('returns an array buffer of the appropriate size', async () => {
    const arrayBuffer = await fetchCanvas()
    const pixelArray = new Uint32Array(arrayBuffer)

    expect(pixelArray.length).toBe(config.ROWS * config.COLUMNS)
  })

  test('the 4th color channel (alpha) is at max value (opaque) for all tiles', async () => {
    const arrayBuffer = await fetchCanvas()
    const channelArray = new Uint8ClampedArray(arrayBuffer)
    const alphaChannels = [channelArray[3], channelArray[7], channelArray[11], channelArray[15]]

    alphaChannels.forEach(value => {expect(value).toBe(255)})
  })
})


describe('POST /tile', () => {
  const setTileEndpoint = 'http://localhost:3000/tile'

  function setTile(x, y, c, id) {
    const endpoint = `${setTileEndpoint}?id=${id}&x=${x}&y=${y}&c=${c}`
    return fetch(endpoint, { method: 'POST' }).then(res => res)
  }

  async function getTile(x, y) {
    const arrayBuffer = await fetchCanvas()
    const channelArray = new Uint8ClampedArray(arrayBuffer)
    const tileIndex = (config.COLUMNS * y + x) * 4

    return channelArray.slice(tileIndex, tileIndex + 4)
  }

  test('returns a 200 response', async () => {
    const res = await setTile(0, 0, '000000', 0)
    expect(res.status).toBe(200)
  })

  test('returns a 422 response when no id argument is provided', async () => {
    const res = await setTile(0, 0, "#000000")
    expect(res.status).toBe(422)
  })

  test('returns a 401 response when a valid id argument is provided (an int) for a group that does not exist', async () => {
    const negIdRes = await setTile(0, 0, "#000000", '%2D1')
    expect(negIdRes.status).toBe(401)

    const highIdRes = await setTile(0, 0, "#000000", config.IDLIMIT + 1)
    expect(highIdRes.status).toBe(401)
  })

  test('returns a 422 response when a non-existent tile is requested, or when the tile argument(s) are missing/incomplete', async () => {
    const resLowBound = await setTile(-1, 0, "#000000", 0)
    expect(resLowBound.status).toBe(422)

    const resHighBound = await setTile(0, config.ROWS, "#000000", 0)
    expect(resHighBound.status).toBe(422)

    const resMissingArg = await setTile(undefined, 0, "#000000", 0)
    expect(resMissingArg.status).toBe(422)
  })

  test('succesfully sets and resets the first tile', async () => {
    await setTile(0, 0, 'FFFFFF', 0)
    const tileChannelsWhite = await getTile(0, 0)

    expect(tileChannelsWhite).toEqual(new Uint8ClampedArray([255, 255, 255, 255]))

    await setTile(0, 0, '000000', 0)
    const tileChannelsBlack = await getTile(0, 0)

    expect(tileChannelsBlack).toEqual(new Uint8ClampedArray([0, 0, 0, 255]))
  })

  test('succesfully sets and resets the second tile', async () => {
    await setTile(1, 0, 'FFFFFF', 0)
    const tileChannelsWhite = await getTile(1, 0)

    expect(tileChannelsWhite).toEqual(new Uint8ClampedArray([255, 255, 255, 255]))

    await setTile(1, 0, '000000', 0)
    const tileChannelsBlack = await getTile(1, 0)

    expect(tileChannelsBlack).toEqual(new Uint8ClampedArray([0, 0, 0, 255]))
  })

  test('succesfully sets colors', async () => {
    await setTile(1, 0, 'FF0000', 0)
    const tileChannelsRed = await getTile(1, 0)

    expect(tileChannelsRed).toEqual(new Uint8ClampedArray([255, 0, 0, 255]))

    await setTile(1, 0, '00FFFF', 0)
    const tileChannelsCyan = await getTile(1, 0)

    expect(tileChannelsCyan).toEqual(new Uint8ClampedArray([0, 255, 255, 255]))
  })
})

