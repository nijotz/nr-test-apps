'use strict'

const post = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    title: DataTypes.STRING,
    text: DataTypes.STRING
  }, {
    tableName: 'post',
    timestamps: false
  })

  return Post
}

module.exports = post
