const express = require('express')
const config = require('../config')

const validator = require('./src/middleware/validator.js')
const logger = require('./src/middleware/logger.js')
const limiter = require('./src/middleware/rateLimiter.js')

const GameWorker = require('./GameWorker.js')

const app = express()

//*************************** VALIDATOR ****************************************
app.use(validator)

//************************** RATE LIMITER **************************************
app.use(limiter)

//************************* REQ LOGGER *****************************************
app.use(logger)

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

  GameWorker.setTile(tile, req.query.id)
  GameWorker.emitTile(tile, req.query.id)
  res.send(true)
})

app.get('/board', (req, res) => {
  res.send(GameWorker.getBoard)
})


//******************** GROUP ROUTING *******************************************
app.get('/group', (req, res) => {
  const groupsInfo = GameWorker.getAllGroupInfo()
  res.send(JSON.stringify(groupsInfo))
})

app.get('/group/:groupId', (req, res) => {
  const group = GameWorker.getGroupInfo(req.query.id)
  res.send(JSON.stringify(group))
})


//******************** GROUP NETSTAT *******************************************
app.get('/netstat', (req, res) => {
})


//***************************** REQ ERROR HANDLING *****************************
app.use((err, req, res, next) => {
  res.status(500).send('something went wrong!: ', err.stack)
})

app.use((req, res) => {
  res.status(400).send('endpoint not found')
})


//*********************************** START! ***********************************

app.listen(config.HTTPPORT, () => {
  console.log("API server loaded with config:\n", config)
  console.log(`App listening on port ${config.HTTPPORT}!`)
})
