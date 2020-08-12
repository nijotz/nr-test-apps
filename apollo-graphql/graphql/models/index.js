'use strict'

const Sequelize = require('sequelize')
const authorModel = require('./author')
const postModel = require('./post')

const sequelize = new Sequelize(process.env.DATABASE_URL)

authorModel(sequelize, Sequelize.DataTypes)
postModel(sequelize, Sequelize.DataTypes)

const models = sequelize.models

module.exports = models
