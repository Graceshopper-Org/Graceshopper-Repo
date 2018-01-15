const router = require('express').Router()
const { Order, Product, User } = require('../db/models')
const Promise = require('bluebird')

module.exports = router

// REVIEW: access control??

router.get('/', (req, res, next) => {
  Order.findAll({
    include: [{
      model: User
    }]
  })
    .then(orders => res.json(orders))
    .catch(next)
})

router.get('/users/:userId', (req, res, next) => {
  let userId = req.params.userId
  Order.findAll({
    where: { userId }
  })
  .then(orders => res.json(orders))
  .catch(next)
})

router.get('/:id', (req, res, next) => {
  let id = req.params.id
  Order.findById(id)
  .then(order => res.json(order))
  .catch(next)
})

router.post('/', (req, res, next) => {
  Order.create(req.body)
  .then(order => res.json(order))
  .catch(next)
})

router.put('/:id', (req, res, next) => {
  let id = req.params.id
  Order.findById(id)
  .then(order => {
    order.update(req.body)
  })
  .then(() => res.sendStatus(200))
  .catch(next)
})


router.delete('/:id', (req, res, next) => {
  let id = req.params.id
  Order.destroy({
    where: { id }
  })
  .then(() => res.sendStatus(204))
  .catch(next)
})
