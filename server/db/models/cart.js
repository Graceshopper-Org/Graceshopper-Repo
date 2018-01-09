const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  products: {
    type: Sequelize.ARRAY(Sequelize.OBJECT),
    defaultValue: []
  },
  createdAt: Sequelize.DATE
})

module.exports = Cart
