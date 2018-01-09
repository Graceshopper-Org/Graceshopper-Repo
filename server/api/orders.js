const router = require('express').Router()
const { Order, Product, User } = require('../db/models')
const Promise = require('bluebird')

module.exports = router

router.get('/', (req, res, next) => {
  Order.findAll({
    include: [{
      model: Product
    }]
  })
    .then(orders => res.json(orders))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  let id = req.params.id
  Order.findAll({
    where: { id },
    include: [{
      model: Product
    }]
  })
  .then(order => res.json(order))
  .catch(next)
})

router.post('/', (req, res, next) => {
  Order.findOrCreate({
    where: {
      status: req.body.status
    }
  })
    .spread(order => order)
    .then(product => {
      if (req.body.categories) {
        let promiseArray = []
        req.body.categories.forEach(categoryElem => {
          promiseArray.push(Category.findOne({
            where: {
              categoryName: categoryElem
            }
          })
          .then(category => {
            product.addCategory([category])
          }))
        })
        Promise.all(promiseArray)
        .then(() => res.json(product))
      } else {
        return res.json(product)
      }
    })
    .catch(next)
})

