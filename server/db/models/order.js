const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  products: {
    type: Sequelize.ARRAY(Sequelize.JSON),
    defaultValue: []
  },
  createdAt: Sequelize.DATE,
  status: {
    type: Sequelize.STRING,
    defaultValue: 'pending'
  },
  email: {
    type: Sequelize.STRING,
  },
  streetAddress: {
    type: Sequelize.STRING
  },
  city: {
    type: Sequelize.STRING
  },
  stateCode: {
    type: Sequelize.STRING
  },
  zipCode: {
    type: Sequelize.INTEGER,
    validate: {
      len: [5, 5]
    }
  }
})

module.exports = Order
