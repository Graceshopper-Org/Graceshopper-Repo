const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.STRING
  },
  createdAt: Sequelize.DATE
})

module.exports = Order
