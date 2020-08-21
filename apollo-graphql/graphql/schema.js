'use strict'

const { gql } = require('apollo-server')

const typeDefs = gql`
  directive @date(
    defaultFormat: String = "mmmm d, yyyy"
  ) on FIELD_DEFINITION

  scalar Date

  type Author {
    id: Int
    name: String
    bio: String
    posts: [Post]
    views: Int
    created_date: Date @date
  }

  type Post {
    id: Int
    title: String
    text: String
    author: Author
    views: Int
    created_date: Date @date
  }

  union Result = Author | Post

  type Query {
    authors: [Author]!
    posts: [Post]!
    author(id: ID!): Author
    post(id: ID!): Post
    search(contains: String!): [Result]
  }
`

module.exports = typeDefs
