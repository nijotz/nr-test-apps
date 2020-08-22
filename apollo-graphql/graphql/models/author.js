'use strict'

const { DataTypes, Model } = require('sequelize')
const sequelize = require('./db')

class Author extends Model {}

Author.init({
  id: { type: DataTypes.INTEGER, primaryKey: true },
  name: DataTypes.STRING,
  bio: DataTypes.STRING,
  created_date: DataTypes.DATE
}, {
  sequelize,
  tableName: 'author',
  timestamps: false
})

module.exports = Author
