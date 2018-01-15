const router = require('express').Router()
const { Category, Product, Review } = require('../db/models')
const Promise = require('bluebird')
module.exports = router

router.get('/', (req, res, next) => {
  Product.findAll({
    include: [{
      model: Category
    }, {
      model: Review
    }]
  })
    .then(products => res.json(products))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  let id = req.params.id
  Product.findAll({
    where: { id },
    include: [{
      model: Category
    }, {
      model: Review
    }]
  })
  .then(product => res.json(product))
  .catch(next)
})

// const adminGateway = (req, res, next) => {
//  if (req.user.isAdmin) {
//    next()
//  }
//  else {
//    next('ADMINS ONLY')
//  }
// }
//
// router.get('/some-url', adminGateway, (req, res, next) => {
//
// })
//
// OR
//
// register this before ALL OTHER admin urls
// router.user('/admin', adminGateway)
//
// === orders.js
// router = new express.Router()
//
// router.param('id', async (req, res, next) => {
//  const order = await Order.findById(req.params.id)
//  if (req.user.isAdmin || req.user.id === order.userId) {
//    next()
//  }
//  else {
//    next('THIS IS NOT YOUR ORDER!')
//  }
// })
// router.get('/:id', (req, res, next) => {
//  if (user.isAdmin) {
//   res.json(req.order)
//  }
//  else if (user.isSupportStaff) {
//    res.json(/* get the params that support can see */)
//  }
//  else {
//
//  }
// })
// router.put('/:id', ...

get /api/admin/order/:id admin
get /api/order/:id customer
get /api/support/:id customer support


router.post('/', (req, res, next) => {
  Product.findOrCreate({
    where: {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      inventory: req.body.inventory,
      photo: req.body.photo && req.body.photo
    }
  })
    .spread(product => product)
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

router.put('/:id', (req, res, next) => {
  let id = req.params.id
  Product.findOne({
    where: { id },
    include: [{
      model: Category
    }]
  })
  .then(product => {
    product.update(req.body)
  })
  .then(() => res.json(req.body).status(200))
  .catch(next)
})

/*
THIS IS THE ATTEMPT AT THE ROUTE TO UPDATE PRODUCT + Category

:( no working sad

router.put('/:id', (req, res, next) => {
  let id = req.params.id
  Product.findOne({
    where: { id },
    include: [{
      model: Category
    }]
  })
  .then(product => {
    Category.findOne({
      where: {
        id: product.categories[0].dataValues.id
      }
    })
    .then(totalproduct => {
      totalproduct.update(req.body)
    })
  })
  .then(() => res.json(req.body).status(200))
  .catch(next)
})
*/

router.delete('/:id', (req, res, next) => {
  let id = req.params.id
  Product.destroy({
    where: { id }
  })
  .then(() => res.sendStatus(204))
  .catch(next)
})
