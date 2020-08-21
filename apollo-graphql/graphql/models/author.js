'use strict'

const author = (sequelize, DataTypes) => {
  const Author = sequelize.define('Author', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    name: DataTypes.STRING,
    bio: DataTypes.STRING
  }, {
    tableName: 'author',
    timestamps: false
  })
  return Author
}

module.exports = author
