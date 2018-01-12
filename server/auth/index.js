const router = require('express').Router()
const User = require('../db/models/user')
const Cart = require('../db/models/cart')
const ProductCart = require('../db/models/productCart')
module.exports = router

router.post('/login', (req, res, next) => {
  let returnCart
  User.findOne({where: {email: req.body.email}})
    .then(user => {
      if (!user) {
        res.status(401).send('User not found')
      } else if (!user.correctPassword(req.body.password)) {
        res.status(401).send('Incorrect password')
      } else {
        req.login(user, err => (err ? next(err)
        : Cart.findOne(
          {where: {
            userId: user.id,
            status: 'open'
          }}
        )
        .then(oldCart => {
          if (oldCart !== null){
            returnCart = oldCart
            ProductCart.findOne(
              {where: {
                cartId: oldCart.id
              }}
            )
            .then(products => {
              console.log('products', products)
              if (products !== null){
                Cart.destroy({
                  where: {id: req.cookies.cart}
                })
                .then(() => {
                  res.json(user)})
              } else {
                Cart.destroy({
                  where: {userId: user.id}
                }).then(() => {
                  Cart.findOne({where: {id: +req.cookies.cart}})
                  .then(newCart => {
                    Cart.update({userId: user.id}, {
                      where: {id: req.cookies.cart}
                    })
                    .then(() => res.json(user))
                  })
                }
              )
              }
            })
          }
        })
        ))
      }
    })
    .catch(next)
})

router.post('/signup', (req, res, next) => {
  User.create(req.body)
    .then(user => {
      req.login(user, err => (err ? next(err)
      : Cart.findOne(
        {where: {
          id: req.cookies.cart
        }})
        .then(() => {
          Cart.update({where: {userId: user.id}})
        })
        .then(() => {
          res.json(user)
        })
      ))
    })
    .catch(err => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(401).send('User already exists')
      } else {
        next(err)
      }
    })
})

router.post('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  let cartId
  if (!req.cookies.cart){
    Cart.create()
    .then(cart => {cartId = cart.dataValues.id})
    .then(() => {
      res.cookie('cart', cartId).json(req.user)
    })
  } else {
    console.log('COOKIE', req.cookies.cart)
    res.json(req.user)
  }
})

router.use('/google', require('./google'))
