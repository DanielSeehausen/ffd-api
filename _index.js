// const express = require('express')
// const config = require('./config')
//
// const validator = require('./src/middleware/validator.js')
// const logger = require('./src/middleware/logger.js')
// const limiter = require('./src/middleware/rateLimiter.js')
//
// const Group = require('./src/app/group.js')
// const Game = require('./src/app/game.js')
// const Netstat = require('./src/app/netstat')
// const game = new Game()
//
//
// const app = express()
//
// //*************************** VALIDATOR ****************************************
// app.use(validator)
//
// //************************** RATE LIMITER **************************************
// app.use(limiter)
//
// //************************* REQ LOGGER *****************************************
// app.use(logger)
//
// //***************************** VALID URL ROUTING ******************************
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST')
//   res.setHeader('Access-Control-Allow-Origin', '*')
//   next()
// })
//
// app.post('/tile', (req, res) => { // /tile?x=x&y=y&c=c&id=ID
//   const tile = {
//     x: parseInt(req.query.x),
//     y: parseInt(req.query.y),
//     hexStr: `${req.query.c}`
//   }
//   game.setTile(tile, req.query.id)
//   res.send(true)
// })
//
// app.get('/tile', (req, res) => {
//   const payload = JSON.stringify(game.getTile(req.query.x, req.query.y))
//   res.send(payload)
// })
//
// // board?id=0; id coming from browser client config for requestor verification
// app.get('/board', (req, res) => {
//   res.send(new Buffer(game.getBoard(), 'binary'))
// })
//
//
// //******************** GROUP ROUTING *******************************************
// app.get('/group', (req, res) => {
//   // TODO: once tests are implemented remove this catch all
//   try {
//     res.send(JSON.stringify(Object.values(Group.all)))
//   } catch (e) {
//     console.error("fetching all groups broke...:\n", e)
//     res.send(JSON.stringify(group))
//   }
// })
//
// app.get('/group/:groupId', (req, res) => {
//     const group = Group.all[req.query.id]
//     res.send(JSON.stringify(group))
// })
//
//
// //******************** GROUP NETSTAT *******************************************
// app.get('/netstat', (req, res) => {
//   const netstat = Netstat.getNetstat(game)
//   res.send(JSON.stringify(netstat))
// })
//
//
// //***************************** REQ ERROR HANDLING *****************************
// app.use((err, req, res, next) => {
//   res.status(500).send('something went wrong!: ', err.stack)
// })
//
// app.use((req, res) => {
//   res.status(400).send('endpoint not found')
// })
//
//
// //*********************************** START! ***********************************
//
// app.listen(config.HTTPPORT, () => {
//   console.log("API server loaded with config:\n", config)
//   console.log(`App listening on port ${config.HTTPPORT}!`)
// })
