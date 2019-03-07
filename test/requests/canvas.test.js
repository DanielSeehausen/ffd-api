// make tests grab from server's config
// TODO: derive config from config endpoint, instead of hard coding
const testConfig = { ROWS: 2, COLUMNS: 2, PIXELCOUNT: 4}

const fetch = require('node-fetch')

const canvasEndpoint = 'http://localhost:3000/canvas?id=0'
const setTileEndpoint = 'http://localhost:3000/tile?id=0'

const fetchCanvas = () => fetch(canvasEndpoint).then(res => res.arrayBuffer())


describe('GET /canvas', () => {
  
  test('returns a 200 response', async () => {
    const res = await fetch(canvasEndpoint)
    
    expect(res.status).toBe(200)
  })
  
  test('returns a 422 response when no id argument is provided, with a useful human readable message', async () => {
    const fetchCanvasEndpoint = () => fetch('http://localhost:3000/canvas').then(res => res)
    
    const res = await fetchCanvasEndpoint()
    console.log(res.status);
    
    //TODO: implement

    expect(res.status).toBe(422)
  })

  test('returns a 422 response when an invalid id argument is provided for a group that does not exist, with a useful human readable message', async () => {
    //TODO: implement
    const fetchCanvasEndpoint = () => fetch('http://localhost:3000/canvas?id=%2D1').then(res => res)

    const res = await fetchCanvasEndpoint()
    console.log(res);

    expect(res.status).toBe(422)
  })

  test('returns an array buffer of the appropriate size', async () => {
    const arrayBuffer = await fetchCanvas()
    const pixelArray = new Uint32Array(arrayBuffer)

    expect(pixelArray.length).toBe(testConfig.PIXELCOUNT)
  })

  test('the 4th color channel (alpha) is at max value (opaque) for all tiles', async () => {
    const arrayBuffer = await fetchCanvas()
    const channelArray = new Uint8ClampedArray(arrayBuffer)
    const alphaChannels = [channelArray[3], channelArray[7], channelArray[11], channelArray[15]]

    alphaChannels.forEach(value => {expect(value).toBe(255)})
  })
})

describe('POST /tile', () => {

  function setTile(x, y, c) {
    const endpoint = `${setTileEndpoint}&x=${x}&y=${y}&c=${c}`
    return fetch(endpoint, { method: 'POST' }).then(res => res)
  }

  async function getTile(x, y) {
    const arrayBuffer = await fetchCanvas()
    const channelArray = new Uint8ClampedArray(arrayBuffer)
    const tileIndex = (testConfig.COLUMNS * y + x) * 4

    return channelArray.slice(tileIndex, tileIndex + 4)
  }

  test('returns a 200 response', async () => {
    const res = await setTile(0, 0, '000000')

    expect(res.status).toBe(200)
  })

  test.skip('returns a 422 response when no id argument is provided, with a useful human readable message', async () => {
    //TODO: implement
    expect(false).tobe(true)
  })

  test.skip('returns a 401 response when an invalid id argument is provided for a group that does not exist, with a useful human readable message', async () => {
    //TODO: implement
    expect(false).tobe(true)
  })

  test.skip('returns a 422 response when a non-existent tile is requested, or when the tile argument(s) are missing/incomplete, with a useful human readable message', async () => {
    //TODO: implement
    expect(false).tobe(true)
  })

  test('succesfully sets and resets the first tile', async () => {
    await setTile(0, 0, 'FFFFFF')
    const tileChannelsWhite = await getTile(0, 0)

    expect(tileChannelsWhite).toEqual(new Uint8ClampedArray([255, 255, 255, 255]))

    await setTile(0, 0, '000000')
    const tileChannelsBlack = await getTile(0, 0)

    expect(tileChannelsBlack).toEqual(new Uint8ClampedArray([0, 0, 0, 255]))
  })

  test('succesfully sets and resets the second tile', async () => {
    await setTile(1, 0, 'FFFFFF')
    const tileChannelsWhite = await getTile(1, 0)

    expect(tileChannelsWhite).toEqual(new Uint8ClampedArray([255, 255, 255, 255]))

    await setTile(1, 0, '000000')
    const tileChannelsBlack = await getTile(1, 0)

    expect(tileChannelsBlack).toEqual(new Uint8ClampedArray([0, 0, 0, 255]))
  })

  test('succesfully sets colors', async () => {
    await setTile(1, 0, 'FF0000')
    const tileChannelsRed = await getTile(1, 0)

    expect(tileChannelsRed).toEqual(new Uint8ClampedArray([255, 0, 0, 255]))

    await setTile(1, 0, '00FFFF')
    const tileChannelsCyan = await getTile(1, 0)

    expect(tileChannelsCyan).toEqual(new Uint8ClampedArray([0, 255, 255, 255]))
  })
})

