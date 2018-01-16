const router = require('express').Router()
const { Order, User } = require('../db/models')

module.exports = router


const adminGateway = (req, res, next) => {
  if(req.user.isAdmin) {
		next()
	} else {
		next('Sorry, This feature can be used by admins only.')
	}
}

// ====== EMAIL CONFIGURATION =====

let nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
         user: 'graceshopperfullstackpajn@gmail.com',
         pass: 'pajn1234'
     }
 });

const mailOptionsCreatedOrder = {
  from: 'graceshopperfullstackpajn@gmail.com', // sender address
  to: 'to@email.com', // list of receivers
  subject: `MEMESRUS: Order Confirmation`, // Subject line
  html: '<p>Thank you for submitting your order with MEMESRUS! We will send you a notification once your order has shipped!</p>'// plain text body
}

const mailOptionsOrderShipped = {
  from: 'sender@email.com', // sender address
  to: 'to@email.com', // list of receivers
  subject: `MEMESRUS: Order Shipped`, // Subject line
  html: '<p>Your order has been shipped!</p>'// plain text body
}

const mailOptionsOrderDelivered = {
  from: 'sender@email.com', // sender address
  to: 'to@email.com', // list of receivers
  subject: `MEMESRUS: Order Delivered`, // Subject line
  html: '<p>Your order has been delivered!</p>'// plain text body
}

// ====== EMAIL CONFIGURATION =====

router.get('/', (req, res, next) => {
  Order.findAll({
    include: [{
      model: User
    }]
  })
    .then(orders => res.json(orders))
    .catch(next)
})

router.get('/users/:userId', (req, res, next) => {
  let userId = req.params.userId
  Order.findAll({
    where: { userId }
  })
  .then(orders => res.json(orders))
  .catch(next)
})

router.get('/:id', (req, res, next) => {
  let id = req.params.id
  Order.findById(id)
  .then(order => res.json(order))
  .catch(next)
})

router.post('/', (req, res, next) => {
  Order.create(req.body)
    .then(order => {
      res.json(order)
      User.findById(req.body.userId)
        .then(user => {
          mailOptionsCreatedOrder.to = user.email.toString()
          transporter.sendMail(mailOptionsCreatedOrder, (err, info) => {
            if (err) console.log(err)
            else console.log(info)
          })
        })
    })
    .catch(next)
})

router.put('/:id', adminGateway, (req, res, next) => {
  let id = req.params.id
  Order.findById(id)
    .then(order => {

      order.update(req.body)

      User.findById(order.userId)
        .then(user => {
          if (req.body.status.toUpperCase() === 'PROCESSING') {
            mailOptionsOrderShipped.to = user.email.toString()
            transporter.sendMail(mailOptionsOrderShipped, (err, info) => {
              if (err) console.log(err)
              else console.log(info)
            })
          } else if (req.body.status.toUpperCase() === 'COMPLETED') {
            mailOptionsOrderDelivered.to = user.email.toString()
            transporter.sendMail(mailOptionsOrderDelivered, (err, info) => {
              if (err) console.log(err)
              else console.log(info)
            })
          }
        })

    })
    .then(() => res.sendStatus(200))
    .catch(next)
})


router.delete('/:id', adminGateway, (req, res, next) => {
  let id = req.params.id
  Order.destroy({
    where: { id }
  })
  .then(() => res.sendStatus(204))
  .catch(next)
})
