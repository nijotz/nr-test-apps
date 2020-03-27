'use strict'

const newrelic = require('newrelic')
const express = require('express')
const http = require('http')
const https = require('https')
const errorhandler = require('errorhandler')

const app = express()

app.use(errorhandler())

app.get('/', function root(_, res, next) {
  try {
    let requests = []
    let numRequests = 0

    function handleResult(num) {
      return function _handleResult(result) {
        // console.log('status', num, result.statusCode)
        if (numRequests === 2) {
          let err = new Error('yuh')
          newrelic.noticeError(err)
          // next(err)
        }

        numRequests++
        if (numRequests === requests.length) {
          if (!res.headersSent) {
            try {
              res.send('hello world\n')
            } catch (err) {
              console.error(err)
            }
          }
        }

        // Not having this will keep the connection open, when hammering this service, too
        // many connections will be held open and you'll have a Bad Time™
        result.on('data', () => {})
      }
    }

    requests.push(http.get('http://www.newrelic.com', handleResult(1)))
    requests.push(http.request('http://www.newrelic.com', handleResult(2)).end())
    requests.push(https.get('https://www.newrelic.com', handleResult(3)))
    requests.push(https.request('https://www.newrelic.com', handleResult(4)).end())
    requests.forEach(r => r.on('error', console.error))
  } catch (err) {
    console.error('oh shit', err)
  }
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
