'use strict'

const newrelic = require('newrelic')

const { ApolloServer, SchemaDirectiveVisitor } = require('apollo-server')
const dateformat = require('dateformat')
const { defaultFieldResolver, GraphQLString } = require('graphql')
const Redis = require('ioredis')

const shimPlugin = require('./plugin')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const models = require('./models')

const redis = new Redis({host:'redis'})

class DateFormatDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field
    const { defaultFormat } = this.args

    field.args.push({
      name: 'format',
      type: GraphQLString
    })

    field.resolve = async (...args) => {
      const date = await resolve.apply(this, args)
      const format = args[1].format
      return dateformat(date, format || defaultFormat)
    }

    field.type = GraphQLString
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  schemaDirectives: { date: DateFormatDirective },
  dataSources: () => {
    return {
      models,
      redis
    }
  },
  plugins: [ shimPlugin({newrelic}) ]
})

server
  .listen({ port: process.env.PORT || 4000 })
  .then(({ url }) => {
    console.log(`🚀 app running at ${url}`)
  })
