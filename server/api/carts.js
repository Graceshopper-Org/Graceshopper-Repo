const router = require('express').Router()
const { Cart, Product, User, productCart } = require('../db/models')
const Promise = require('bluebird')

module.exports = router
//
// router.get('/', (req, res, next) => {
//   Cart.findAll({
//     include: [{
//       model: Product
//     }]
//   })
//     .then(carts => res.json(carts))
//     .catch(next)
// })
//
// router.get('/:id', (req, res, next) => {
//   let id = req.params.id
//   Cart.findAll({
//     where: { id },
//     include: [{
//       model: Product
//     }]
//   })
//   .then(cart => res.json(cart))
//   .catch(next)
// })
//
// router.post('/', (req, res, next) => {
//   Cart.findOrCreate({
//     where: {
//       status: req.body.status
//     }
//   })
//     .spread(cart => cart)
//     .then(cart => {
//       if (req.body.products) {
//         let promiseArray = []
//         req.body.products.forEach(productElem => {
//           promiseArray.push(Product.findOne({
//             where: {
//               id: productElem.id
//             }
//           })
//           .then(product => {
//             cart.addProduct([product])
//             return product
//           })
//           .then(product => {
//             productCart.findOne({
//               where: {
//                 productId: product.id,
//                 cartId: cart.id
//               }
//             })
//             .then(productCartRow => {
//               let updateObj = {
//                 quantity: productElem.quantity,
//                 price: product.price
//               }
//               productCartRow.update(updateObj)
//             })
//           }))
//         })
//         promiseArray.push(User.findOne({
//           where: {
//             id: req.body.userId
//           }
//         })
//       .then(user => {
//         cart.setUser(user)
//       })
//       )
//         Promise.all(promiseArray)
//         .then(() => res.json(cart))
//       } else {
//         return res.json(cart)
//       }
//     })
//     .catch(next)
// })
//
// router.put('/:id', (req, res, next) => {
//   let id = req.params.id
//   Cart.findById(id)
//   .then(cart => {
//     cart.update(req.body)
//   })
//   .then(() => {
//     res.sendStatus(200)
//   })
//   .catch(next)
// })
//
// router.delete('/:id', (req, res, next) => {
//   let id = req.params.id
//   Cart.destroy({
//     where: {
//       id
//     }
//   })
//   .then(() => {
//     res.sendStatus(204)
//   })
//   .catch(next)
// })
