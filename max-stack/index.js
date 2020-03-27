'use strict'

require('newrelic')
const express = require('express')
const cors = require('cors')

const app = express()

let router = express.Router()
router.get('/', async function root(req, res, next) {
  throw new Error('here')
  res.send('hello world\n')
  return next('route')
})

const corsOptions = {
  origin: 'http://example.com',
}

app.use('/', cors(corsOptions), (_, res, next) => {
  res.header('Expires', '-1')
  // throw new Error('HERE')
  return next('test')
}, router)

// Server run
const port = 8000
app.listen(port, err => {
  if (err) {
    e => console.log(`Error: ${e}`)
  } else {
    console.log(`Example app listening on port ${port}!`)
  }
})
