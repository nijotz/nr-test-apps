'use strict'
/**
 * New Relic agent configuration.
 *
 * See lib/config/default.js in the agent distribution for a more complete
 * description of configuration variables and their potential values.
 */
exports.config = {
  app_name: ['apollo-graphql-test'],
  host: 'staging-collector.newrelic.com',
  license_key: 'ENV',
  logging: {
    level: 'info',
    filepath: 'stdout'
  },
  distributed_tracing: { enabled: true },
  feature_flag: {
    infinite_tracing: true
  },
  infinite_tracing: {
    trace_observer: {
      host: 'nr-internal.aws-us-east-2.tracing.staging-edge.nr-data.net'
    }
  },
  allow_all_headers: true,
  attributes: {
    exclude: [
      'request.headers.cookie',
      'request.headers.authorization',
      'request.headers.proxyAuthorization',
      'request.headers.setCookie*',
      'request.headers.x*',
      'response.headers.cookie',
      'response.headers.authorization',
      'response.headers.proxyAuthorization',
      'response.headers.setCookie*',
      'response.headers.x*'
    ]
  }
}
