const router = require('express').Router()
const {Review, User} = require('../db/models')
const Promise = require('bluebird')
module.exports = router

router.get('/', (req, res, next) => {
  Review.findAll({
    include: [{
      model: User
    }]
  })
  .then(reviews => res.json(reviews))
  .catch(next)
})

router.get('/:id', (req, res, next) => {
  let id = req.params.id
  Review.findAll({
    where: { id },
    include: [{
      model: User
    }]
  })
  .then(review => res.json(review))
  .catch(next)
})

router.post('/', (req, res, next) => {
  Review.findOrCreate({
    where:{
      description: req.body.description,
      stars: req.body.stars,
      productId: req.body.productId && req.body.productId,
      userId: req.body.userId && req.body.userId
    }
  })
  .spread(review => review)
  .then(review => res.json(review))
  .catch(next)
})

router.put('/:id', (req, res, next) => {
  let id = req.params.id
  Review.findById(id)
  .then(review => {
    review.update(req.body)
  })
  .then(() => res.sendStatus(200))
  .catch(next)
})

router.delete('/:id', (req, res, next) => {
  let id = req.params.id
  Review.destroy({
    where: { id }
  })
  .then(() => res.sendStatus(204))
  .catch(next)
})
