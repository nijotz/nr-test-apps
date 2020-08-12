'use strict'

require('newrelic')

const { ApolloServer } = require('apollo-server')

const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const models = require('./models')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return { models }
  }
})

server
  .listen({ port: process.env.PORT || 4000 })
  .then(({ url }) => {
    console.log(`🚀 app running at ${url}`)
  })
