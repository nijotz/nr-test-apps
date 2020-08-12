'use strict'

module.exports = {
  Query: {
    posts: async (parent, args, { dataSources } ) => {
      const models = dataSources.models
      return await models.Post.findAll()
    },
    post: async (parent, { id }, { dataSources } ) => {
      const models = dataSources.models
      return await models.Post.findByPk(id)
    },
    authors: async (parent, args, { dataSources } ) => {
      const models = dataSources.models
      return await models.Author.findAll()
    },
    author: async (parent, { id }, { dataSources } ) => {
      const models = dataSources.models
      return await models.Author.findByPk(id)
    },
  }
}
