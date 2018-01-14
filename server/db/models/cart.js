const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  status: {
    type: Sequelize.STRING,
    defaultValue: 'open'
  }
})

module.exports = Cart
