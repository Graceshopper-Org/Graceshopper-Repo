const router = require('express').Router()
const { Cart, Product, User, productCart } = require('../db/models')
const Promise = require('bluebird')

module.exports = router

router.get('/', (req, res, next) => {
  Cart.findAll({
    include: [{
      model: Product
    }]
  })
    .then(carts => res.json(carts))
    .catch(next)
})
//
router.get('/:id', (req, res, next) => {
  let id = req.params.id
  Cart.findAll({
    where: { id },
    include: [{
      model: Product
    }]
  })
  .then(cart => res.json(cart))
  .catch(next)
})

router.post('/', (req, res, next) => {
  Cart.create()
    .then(cart => {

        let promiseArray = []
        req.body.products.forEach(productElem => {
          promiseArray.push(Product.findOne({
            where: {
              id: productElem.id
            }
          })
          .then(product => {
            cart.addProduct([product])
            return product
          })
          .then(product => {
              // Note: Niharika had to use Find All and return results below in the interest of time, because Find One by itself wouldn't work
              productCart.findAll()
              .then(productCarts => {
                return productCarts
              })
              .then(() => productCart.findOne({
                where: {
                  productId: product.id,
                  cartId: cart.id
                }
              }))
              .then(productCartRow => {
                let updateObj = {
                  quantity: productElem.quantity,
                  price: product.price
                }
                productCartRow.update(updateObj)
              })
          }))
        })

        promiseArray.push(User.findOne({
          where: {
            id: req.body.userId
          }
        })
          .then(user => {
            cart.setUser(user)
        }))

        Promise.all(promiseArray)
        .then(() => res.json(cart))
    })
    .catch(next)
})

router.put('/:id', (req, res, next) => {
  let id = req.params.id
  let promiseArray = []

  if (req.body.newProduct) {
    Cart.findById(id)
      .then(cart => {
          Product.findById(req.body.newProduct.id)
          .then(product => {
            productCart.create({
              cartId: cart.id,
              productId: req.body.newProduct.id,
              quantity: req.body.newProduct.quantity,
              price: product.price
            })
          })
      })
      .then(() => res.sendStatus(200))
      .catch(next)
    }
    /// do we need an ability to update the product price in a cart?
  if (req.body.products) {
    req.body.products.forEach(productElem => {
      promiseArray.push(
        productCart.findOne({
          where: {
            productId: productElem.id,
            cartId: id
          }
        })
        .then(productCartRow => productCartRow.update({ quantity: productElem.quantity }))
      )
    })
    Promise.all(promiseArray)
      .then(() => res.sendStatus(200))
      .catch(next)
  }
})

router.delete('/:id', (req, res, next) => {
  let id = req.params.id
  Cart.destroy({
    where: {
      id
    }
  })
  .then(() => {
    res.sendStatus(204)
  })
  .catch(next)
})
