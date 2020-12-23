const semver = require('semver')

const fastifyVersion = require('./node_modules/fastify/package.json').version
const v2 = semver.lt(fastifyVersion, '3.0.0')

if (v2) {
  process.env['NEW_RELIC_APP_NAME'] = 'fastify-test-v2'
} else {
  process.env['NEW_RELIC_APP_NAME'] = 'fastify-test-v3'
}

require('newrelic')
const fastify = require('fastify')({
  logger: true
})

function loadMiddleware() {
  fastify.use(require('cors')())
  fastify.use(require('dns-prefetch-control')())
  fastify.use(require('frameguard')())
  fastify.use(require('hide-powered-by')())
  fastify.use(require('hsts')())
  fastify.use(require('ienoopen')())
  fastify.use(require('x-xss-protection')())
}

if (v2) {
  console.log('v2 middleware')
  loadMiddleware()
}

fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
})

const start = async () => {
  try {
    if (!v2) {
      console.log('v3 middleware')
      await fastify.register(require('fastify-express'))
      loadMiddleware()
    }

    await fastify.listen(3000)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
