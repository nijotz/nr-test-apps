'use strict'

const author = (sequelize, DataTypes) => {
  const Author = sequelize.define('Author', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    name: DataTypes.STRING,
    bio: DataTypes.STRING,
    created_date: DataTypes.DATE
  }, {
    tableName: 'author',
    timestamps: false
  })
  return Author
}

module.exports = author
