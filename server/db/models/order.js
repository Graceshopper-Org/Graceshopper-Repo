const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  products: {
    type: Sequelize.ARRAY(Sequelize.JSON),
    defaultValue: []
  },
  createdAt: Sequelize.DATE,
  status: {
    type: Sequelize.STRING
  },
})

module.exports = Order
