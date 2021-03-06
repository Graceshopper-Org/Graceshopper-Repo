const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  title: {
    type: Sequelize.STRING
  },
  photo: {
    type: Sequelize.STRING,
    defaultValue: '/images/defaultphoto.jpg'
  },
  description: {
    type: Sequelize.TEXT
  },
  price: {
    type: Sequelize.INTEGER
  },
  inventory: {
    type: Sequelize.INTEGER
  }
})

module.exports = Product
