const User = require('./user')
const Category = require('./category')
const Order = require('./order')
const Product = require('./product')
const productOrder = require('./productOrder')
const Review = require('./review')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

Product.belongsToMany(Order, {through: productOrder})
Order.belongsToMany(Product, {through: productOrder})
Product.belongsToMany(Category, {through: 'productCategory'})
Category.belongsToMany(Product, {through: 'productCategory'})
User.hasMany(Order)
Order.belongsTo(User)
Product.hasMany(Review, { onDelete: 'cascade', hooks: true })
Review.belongsTo(Product)
User.hasMany(Review)
Review.belongsTo(User)

module.exports = {
  User,
  Category,
  Order,
  Product,
  productOrder,
  Review
}
