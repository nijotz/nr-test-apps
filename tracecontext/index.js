'use strict'

require('newrelic')
const fastify = require('fastify')()

fastify.get('/', async (req, reply) => {
  reply.send({ greet: 'hello' })
})

fastify.listen(3000)
