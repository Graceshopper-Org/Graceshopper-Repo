const router = require('express').Router()
const { Order, Product, User } = require('../db/models')
const Promise = require('bluebird')

module.exports = router
//
// router.get('/', (req, res, next) => {
//   Order.findAll({
//     include: [{
//       model: User
//     }]
//   })
//     .then(orders => res.json(orders))
//     .catch(next)
// })
//
// router.get('/:id', (req, res, next) => {
//   let id = req.params.id
//   Order.findById(id)
//   .then(order => res.json(order))
//   .catch(next)
// })
