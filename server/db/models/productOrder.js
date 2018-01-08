const Sequelize = require('sequelize')
const db = require('../db')

const productOrder = db.define('productOrder', {
  quantity: {
    type: Sequelize.INTEGER
  },
  price: {
    type: Sequelize.DECIMAL(10, 2)
  }
})

module.exports = productOrder
