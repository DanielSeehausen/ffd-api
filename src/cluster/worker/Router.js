const express = require('express')
const cluster = require('cluster')

const config = require('../../../config.js')
const validateRequest = require('../../middleware/validateRequest.js')
const logger = require('../../middleware/logger.js')
const GameManager = require('./GameManager.js')

const app = express()

//*************************** VALIDATOR ****************************************
app.use(validateRequest)

//************************* REQ LOGGER *****************************************
// app.use(logger)

//***************************** VALID URL ROUTING ******************************
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST')
  res.setHeader('Access-Control-Allow-Origin', '*')
  next()
})

app.post('/tile', (req, res) => { // /tile?x=x&y=y&c=c&id=ID

  const tile = {
    x: parseInt(req.query.x),
    y: parseInt(req.query.y),
    hexStr: `${req.query.c}`
  }

  GameManager.setTile(tile, req.query.id)
  res.status(200).send(true)
})

app.get('/canvas', async (req, res) => {
  const canvas = await GameManager.getCanvas()
  res.status(200).send(Buffer.from(canvas))
})


//******************** GROUP ROUTING *******************************************
app.get('/group', (req, res) => {
  const groupsInfo = GameManager.getAllGroup()
  res.status(200).send(JSON.stringify(groupsInfo))
})

app.get('/group/:groupId', (req, res) => {
  const group = GameManager.getGroupInfo(req.query.id)
  res.status(200).send(JSON.stringify(group))
})


//******************** GAMECONFIG *******************************************
app.get('/config', (req, res) => {
  res.status(200).send(JSON.stringify(config))
})


//***************************** REQ ERROR HANDLING *****************************
app.use((err, req, res, next) => {
  res.status(500).send(`something went wrong!: ${err.stack}`)
})

app.use((req, res) => {
  res.status(400).send('endpoint not found')
})


//*********************************** START! ***********************************

app.listen(config.HTTPPORT, () => {
  console.log(`worker ID: ${cluster.worker.id} listening on: ${config.HTTPPORT}!`)
})
