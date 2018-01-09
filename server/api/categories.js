const router = require('express').Router()
const { Category, Product } = require('../db/models')

router.get('/', (req, res, next) => {
  Category.findAll({
    include: [{
      model: Product
    }]
  })
    .then(categories => res.json(categories))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  let id = req.params.id
  Category.findAll({
    where: { id },
    include: [{
      model: Product
    }]
  })
  .then(category => res.json(category))
  .catch(next)
})

router.post('/', (req, res, next) => {
  Category.findOrCreate({
    where: {
      categoryName: req.body.categoryName
    }
  })
    .spread(category => category)
    .then(category => res.json(category))
    .catch(next)
})

router.put('/:id', (req, res, next) => {
  let id = req.params.id
  Category.findById(id)
  .then(category => {
    category.update(req.body)
  })
  .then(() => res.sendStatus(200))
  .catch(next)
})

router.delete('/:id', (req, res, next) => {
  let id = req.params.id
  Category.destroy({
    where: { id }
  })
  .then(() => res.sendStatus(204))
  .catch(next)
})

module.exports = router
