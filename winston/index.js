'use strict'

/* eslint-disable no-console */

require('newrelic')
const newrelicFormatter = require('@newrelic/winston-enricher')

// Logging
const winston = require('winston')
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: 'info',
      format: newrelicFormatter()
    })
  ]
})

// Server setup
const express = require('express')
const app = express()
app.get('/', function root(req, res) {
  res.send('hello world')
  logger.info('hello world')
})

// Server run
const port = 8000
app.listen(port, err => {
  if (err) {
    e => console.log(`Error: ${e}`)
  } else {
    console.log(`Example app listening on port ${port}!`)
  }
})
