const router = require('express').Router()
const { Category, Product, Review } = require('../db/models')
const Promise = require('bluebird')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      include: [{
        model: Category
      }, {
        model: Review
      }]
    })
    res.json(products)
  }
  catch (error) {
    next(error);
  }
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
  Product.findById(id)
  .then(product => {
    product.update(req.body)
  })
  .then(() => res.sendStatus(200))
  .catch(next)
})

router.delete('/:id', (req, res, next) => {
  let id = req.params.id
  Product.destroy({
    where: { id }
  })
  .then(() => res.sendStatus(204))
  .catch(next)
})
