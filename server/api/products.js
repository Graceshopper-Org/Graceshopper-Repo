const router = require('express').Router()
const { Category, Product, Review } = require('../db/models')
const Promise = require('bluebird')
module.exports = router

const adminGateway = (req, res, next) => {
  if (req.user.isAdmin) {
		next()
	} else {
		next('Sorry, This feature can be used by admins only.')
	}
}

router.get('/', (req, res, next) => {
  Product.findAll({
    include: [{
      model: Category
    }, {
      model: Review
    }]
  })
    .then(products => res.json(products))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  let id = req.params.id
  Product.findAll({
    where: { id },
    include: [{
      model: Category
    }, {
      model: Review
    }]
  })
  .then(product => res.json(product))
  .catch(next)
})

router.post('/', adminGateway, (req, res, next) => {
  Product.findOrCreate({
    where: {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      inventory: req.body.inventory,
      photo: req.body.photo && req.body.photo
    }
  })
    .spread(product => product)
    .then(product => {
      if (req.body.categories) {
        let promiseArray = []
        req.body.categories.forEach(categoryElem => {
          promiseArray.push(Category.findOne({
            where: {
              categoryName: categoryElem
            }
          })
          .then(category => {
            product.addCategory([category])
          }))
        })
        Promise.all(promiseArray)
        .then(() => res.json(product))
      } else {
        return res.json(product)
      }
    })
    .catch(next)
})

// router.put('/:id', adminGateway, (req, res, next) => {
//   let id = req.params.id
//   Product.findOne({
//     where: { id },
//     include: [{
//       model: Category
//     }]
//   })
//   .then(product => {
//     product.update(req.body)
//   })
//   .then(() => res.json(req.body).status(200))
//   .catch(next)
// })


router.put('/:id', adminGateway, (req, res, next) => {
  let id = req.params.id
  Product.findOne({
    where: { id },
    include: [{
      model: Category
    }]
  })
  .then(product => {
    let productCategory = product.categories[0].productCategory
    let catId = product.categories[0].dataValues.id
    if (req.body.categories){
      console.log('found category on body')
      Category.findOne({
        where: {
          id: catId
        }
      })
      .then(category => {
        productCategory.destroy({
          where: {
            productId: product.id,
            categoryId: category.dataValues.id
          }
        })
        console.log('after destroy')
      })
      Category.findOne({
        where: {
          categoryName: req.body.categories[0].categoryName
        }
      })
      .then(category => {
        product.addCategory([category])
      })
      console.log('after add')
    }
    product.update(req.body)
  })
  .then(() => res.json(req.body).status(200))
  .catch(next)
})

// router.put('/:id', (req, res, next) => {
//   let id = req.params.id
//   Product.findOne({
//     where: { id },
//     include: [{
//       model: Category
//     }]
//   })
//   .then(product => {
//     product.update(req.body)
//     // console.log('product id : ', product.id)
//     // console.log('product id test : ', product.categories[0])
//      console.log('LOGGGGGGGGGG:', product.categories)
//     productCategory.destroy({
//       where: {
//         productId: +product.id,
//         categoryId: +product.categories[0].id
//       }
//     })
//     // Category.findOne({
//     //   where: {
//     //     id: product.categories[0].id
//     //   }
//     // })
//     // .then(category => {
//     //   })
//   })
//   // .then(product => {
//   //   .then(category => {
//   //     // console.log('LOGGGGGGGGGG:', product.categories[0].productCategory.dataValues.categoryId)
//   //     product.categories[0].productCategory.destroy({
//   //       where: {
//   //         productId: product.id,
//   //         categoryId: category.id
//   //       }
//   //     })
//   //   })
//   // })
//   .then(() => res.json(req.body).status(200))
//   .catch(next)
// })

router.delete('/:id', adminGateway, (req, res, next) => {
  let id = req.params.id
  Product.destroy({
    where: { id }
  })
  .then(() => res.sendStatus(204))
  .catch(next)
})
