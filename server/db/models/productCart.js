const Sequelize = require('sequelize')
const db = require('../db')

const productCart = db.define('productCart', {
  quantity: {
    type: Sequelize.INTEGER
  },
  price: {
    type: Sequelize.INTEGER
  }
})

module.exports = productCart
