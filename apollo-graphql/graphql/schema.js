'use strict'

const { gql } = require('apollo-server')

const typeDefs = gql`
  type Author {
    id: Int
    name: String
    bio: String
    posts: [Post]
  }

  type Post {
    id: Int
    title: String
    text: String
    author: Author
  }

  type Query {
    authors: [Author]!
    posts: [Post]!
    author(id: ID!): Author
    post(id: ID!): Post
  }
`

module.exports = typeDefs
