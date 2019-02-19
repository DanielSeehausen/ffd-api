const fetch = require('node-fetch')

const canvasEndpoint = 'http://localhost:3000/canvas?id=0'
const setTileEndpoint = 'http://localhost:3000/canvas?id=0'

const fetchCanvas = () => fetch(canvasEndpoint).then(res => res.arrayBuffer())


describe('canvas', () => {

  test('returns a 200 response', async () => {
    const res = await fetch(canvasEndpoint)

    expect(res.status).toBe(200)
  })

  test('returns an array buffer of the appropriate size', async () => {
    const arrayBuffer = await fetchCanvas()
    const pixelArray = new Uint32Array(arrayBuffer)

    expect(pixelArray.length).toBe(4)
  })

  test('the 4th color channel (alpha) is at max value (opaque)', async () => {
    const arrayBuffer = await fetchCanvas()
    const channelArray = new Uint8ClampedArray(arrayBuffer)
    const alphaChannels = [channelArray[3], channelArray[7], channelArray[11], channelArray[15]]

    alphaChannels.forEach(value => {expect(value).toBe(255)})
  })

  describe('setting tiles', () => {

    test('returns an array buffer of the appropriate size', async () => {
      expect(false).toBe(true)
    })

  })

})
