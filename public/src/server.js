const http = require('http')
const https = require('https')
const express = require('express')
const bodyParser = require('body-parser')

const routes = require('./routes')
const settings = require('./settings')

const app = express()

let shuttingDown = false
let server

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  if ('OPTIONS' === req.method) {
    return res.send(200);
  }
  next()
})

app.use((req, resp, next) => {
  if (!shuttingDown) return next()

  resp.setHeader('Connection', 'close')
  const err = new Error('Server is in the process of restarting')
  err.status = 503
  next(err)
})

app.use(bodyParser.json())

app.use(function (error, req, res, next) {
  if (error !== null) {
    console.log('\n' + new Date().toISOString(), '[' + req.method + ']', req.originalUrl, '[ERROR] :\n', error, 'n')
    return res.status(settings('HTTP_ERROR_CODE')).json({ message: settings('HTTP_ERROR_TEXT') })
  }
  next()
})

app.use(routes)

app.use((req, res) => {
  res.status(settings('HTTP_ERROR_CODE')).json({message: settings('HTTP_ERROR_TEXT')})
})

async function startServer(){
  await new Promise((resolve) => {
    if (settings('HTTPS')) {
      server = https.createServer(settings('HTTPS_OPTION'), function (req, res) { app(req, res) }).listen(settings('PORT'), resolve)
    } else {
      server = http.createServer(function (req, res) { app(req, res) }).listen(settings('PORT'), resolve)
    }
  })
  server.setMaxListeners(0)
}

async function stopServer(exit){
  shuttingDown = true
  const winner = await Promise.race([
    Promise.all([
      new Promise((resolve) => server ? server.close(resolve) : resolve())
    ]),
    new Promise((resolve) => setTimeout(resolve, 30 * 1000, 'timeout'))
  ])

  if (winner !== 'timeout') {
    console.log('Closed out remaining connections.')
    if (exit) process.exit()
    return
  }

  console.error('Could not close connections in time, forcing shut down')
  if (exit) process.exit(1)
}

module.exports = {
  startServer,
  stopServer,
  default: app
}