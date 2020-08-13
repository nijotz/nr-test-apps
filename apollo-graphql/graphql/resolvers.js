'use strict'

module.exports = {
  Query: {
    posts: async (parent, args, { dataSources } ) => {
      const models = dataSources.models
      const redis = dataSources.redis

      let posts = await models.Post.findAll({raw: true})

      posts = await Promise.all(posts.map(async p => {
        p.views = await redis.hincrby('views_post', p.id, 1)
        return p
      }))

      return posts
    },
    post: async (parent, { id }, { dataSources } ) => {
      const models = dataSources.models
      const redis = dataSources.redis

      let post = await models.Post.findByPk(id, {raw: true})

      post.views = await redis.hincrby('views', id, 1)

      return post
    },
    authors: async (parent, args, { dataSources } ) => {
      const models = dataSources.models
      const redis = dataSources.redis

      let authors = await models.Author.findAll({raw: true})

      authors = await Promise.all(authors.map(async a => {
        a.views = await redis.hincrby('views_author', a.id, 1)
        return a
      }))

      return authors
    },
    author: async (parent, { id }, { dataSources } ) => {
      const models = dataSources.models
      const redis = dataSources.redis

      let author = await models.Author.findByPk(id, {raw: true})

      author.views = await redis.hincrby('views_author', id, 1)

      return author
    },
  }
}
