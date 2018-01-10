const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/categories', require('./categories'))
router.use('/products', require('./products'))
router.use('/orders', require('./orders'))
router.use('/reviews', require('./reviews'))
router.use('/carts', require('./carts'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  console.error(error)
  error.status = 404
  next(error)
})
