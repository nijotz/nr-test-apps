'use strict'

const { DataTypes, Model } = require('sequelize')
const sequelize = require('./db')
const Author = require('./author')

class Post extends Model {}

Post.init({
  id: { type: DataTypes.INTEGER, primaryKey: true },
  title: DataTypes.STRING,
  text: DataTypes.STRING,
  author_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Author',
      key: 'id'
    }
  }
}, {
  sequelize,
  tableName: 'post',
  timestamps: false
})

Author.hasMany(Post, {as: 'posts', foreignKey: 'author_id'})
Post.belongsTo(Author, {as: 'author', foreignKey: 'author_id'})

module.exports = Post
