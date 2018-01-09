const router = require('express').Router()
const { User } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email', 'isAdmin', 'streetAddress', 'city', 'stateCode', 'zipCode', 'firstName', 'lastName']
  })
    .then(users => res.json(users))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  let id = req.params.id
  User.findById(id)
  .then(user => res.json(user))
  .catch(next)
})

router.post('/', (req, res, next) => {
  User.findOrCreate({
    where: {
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName
    }
  })
  .spread(user => user)
  .then(user => res.json(user))
  .catch(next)
})

router.put('/:id', (req, res, next) => {
  let id = req.params.id
  User.findById(id)
  .then(user => {
    user.update(req.body)
  })
  .then(() => res.sendStatus(200))
  .catch(next)
})

router.delete('/:id', (req, res, next) => {
  let id = req.params.id
  User.destroy({
    where: { id }
  })
  .then(() => res.sendStatus(204))
  .catch(next)
})
