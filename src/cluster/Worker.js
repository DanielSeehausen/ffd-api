const express = require('express')
const cluster = require('cluster')

const config = require('./../../config.js')
const validator = require('../middleware/validator.js')
const logger = require('../middleware/logger.js')

const Game = require('./../app/models/Game.js')

const app = express()

//*************************** VALIDATOR ****************************************
app.use(validator)

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

  Game.setTile(tile, req.query.id)
  Game.emitTile(tile, req.query.id)
  res.send(true)
})

app.get('/board', (req, res) => {
  res.send(Game.getBoard)
})


//******************** GROUP ROUTING *******************************************
app.get('/group', (req, res) => {
  const groupsInfo = Game.getAllGroupInfo()
  res.send(JSON.stringify(groupsInfo))
})

app.get('/group/:groupId', (req, res) => {
  const group = Game.getGroupInfo(req.query.id)
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
  console.log(`worker PID: ${process.pid} listening on: ${config.HTTPPORT}!`)
})
