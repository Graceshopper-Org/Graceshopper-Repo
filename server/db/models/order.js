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
    // should we set a default value of "pending" so when an order is placed
    // a user would immediately be able to see that order status
  },
})

module.exports = Order
