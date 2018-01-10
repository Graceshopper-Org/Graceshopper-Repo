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

router.param('id', async (req, res, next) => {
  let id = req.params.id
  const cart = await Cart.findOne({
    where: { id },
    include: [{
      model: Product
    }]
  })
  if (cart.userId === req.user.id) {
    req.cart = cart
    next()
  }
  else {
    req.send(401)
  }
})
//
router.get('/:id', (req, res, next) => {
  res.json(req.cart)
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
})

router.delete('/:id', async (req, res, next) => {
  try {
    await req.cart.destroy()
    res.sendStatus(204)
  }
  catch (error) {
    next(error)
  }
})


GET /products
if user is admin
  return all the products
else
  return all the products where street date < now




GET /products
return all the products where street date < now

GET /admin/products
return all the products

app.use('/admin', (req, res, next) => {
  if (req.user.isAdmin) {
    next()
  }
  else {
    next('Must be an admin')
  }
})





