const fetch = require('node-fetch')

fetch('http://localhost:3000/canvas?id=0')
  .then(res => { console.log(res); return res.arrayBuffer()})
  .then(bufferData => {
    console.log(bufferData)
    const pixelArray = new Uint8ClampedArray(bufferData)
    console.log('fetched canvas: ', pixelArray, "\n length:", pixelArray.length)
  })
