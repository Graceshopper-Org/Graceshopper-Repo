const router = require('express').Router()
const { Category, Product } = require('../db/models')

router.get('/', (req, res, next) => {
  Category.findAll()
    .then(categories => res.json(categories))
    .catch(err => console.error(err))
})

module.exports = router


// {
//   include: [{
//     model: Product,
//     as: 'product'
//   }]
// }
