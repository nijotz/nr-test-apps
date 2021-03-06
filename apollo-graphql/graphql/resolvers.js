'use strict'

function searchQuery(model, query) {
  const sequelize = model.sequelize
  return sequelize.query(`
    SELECT * FROM ${model.tableName}
    WHERE tsv @@ plainto_tsquery('english', :query)`,
    {
      model: model,
      mapToModel: true,
      replacements: { query }
    }
  )
}

function viewsIncrementer(redis, model) {
  return async function incrementViews(instances) {
    // Accept array or a single instance
    let isArray = Array.isArray(instances)
    if (!isArray) { instances = [instances] }

    const key = `views_${model.tableName}`
    instances = await Promise.all(instances.map(async (instance) => {
      instance.views = await redis.hincrby(key, instance.id, 1)
      return instance
    }))

    // Unpack if only one instance passed to the function
    if (!isArray) { instances = instances[0] }
    return instances
  }
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

module.exports = {
  Query: {
    posts: async (parent, args, { dataSources }) => {
      const models = dataSources.models
      const redis = dataSources.redis
      const Post = models.Post
      const postViewsIncrementer = viewsIncrementer(redis, Post)

      await sleep(1000)

      let posts = await Post.findAll(
        {raw: true, nest: true, include: {model: models.Author, as: 'author'}})
      posts = await postViewsIncrementer(posts)

      return posts
    },

    post: async (parent, { id }, { dataSources }) => {
      if (id == 13) { throw new Error('Nope.') }

      const models = dataSources.models
      const redis = dataSources.redis
      const Post = models.Post
      const postViewsIncrementer = viewsIncrementer(redis, Post)

      let post = await models.Post.findByPk(id,
        {raw: true, nest: true, include: {model: models.Author, as: 'author'}})
      post = await postViewsIncrementer(post)

      return post
    },

    authors: async (parent, args, { dataSources }) => {
      const models = dataSources.models
      const redis = dataSources.redis
      const Author = models.Author
      const authorViewsIncrementer = viewsIncrementer(redis, Author)

      let authors = await models.Author.findAll({raw: true})
      authors = await authorViewsIncrementer(authors)

      return authors
    },

    author: async (parent, { id }, { dataSources }) => {
      if (id == 13) { throw new Error('Nope.') }

      const models = dataSources.models
      const redis = dataSources.redis
      const Author = models.Author
      const authorViewsIncrementer = viewsIncrementer(redis, Author)

      let author = await models.Author.findByPk(id, {raw: true})
      author = await authorViewsIncrementer(author)

      return author
    },

    search: async (parent, { contains }, { dataSources }) => {
      const redis = dataSources.redis
      const Post = dataSources.models.Post
      const Author = dataSources.models.Author

      const results = await Promise.all([Post, Author].map(async m => {
        const modelViewsIncrementer = viewsIncrementer(redis, m)
        let results = await searchQuery(m, contains)
        results = await modelViewsIncrementer(results)
        return results
      }))

      return results.flat()
    }
  },

  Author: {
    posts: async (parent, { args }, { dataSources }) => {
      const models = dataSources.models
      const posts = await models.Post.findAll({
        where: { author_id: parent.id }
      })
      return posts
    }
  },

  Mutation: {
    updateAuthor: async (parent, { id, name, bio }, { dataSources }) => {
      const models = dataSources.models
      let author = await models.Author.findByPk(id)
      if (name) { author.name = name }
      if (bio) { author.bio = bio }
      await author.save()
      return author
    }
  },

  Result: {
    __resolveType(obj, context, info) {
      if (obj.name) {
        return 'Author'
      }

      if (obj.title) {
        return 'Post'
      }

      return null
    }
  }
}
