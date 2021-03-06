const User = require('./user')
const Product = require('./product')
const Category = require('./category')
const Order = require('./order')
const Promo = require('./promo')
const Payment = require('./payment')
const OrderProducts = require('./orderProducts')
const Wishlist = require('./wishlist')

Product.belongsTo(Category)
Category.hasMany(Product)

Order.belongsToMany(Product, {through: OrderProducts})
Product.belongsToMany(Order, {through: OrderProducts})
User.belongsToMany(Product, {through: Wishlist})
Product.belongsToMany(User, {through: Wishlist})

Promo.hasMany(Order)
Order.belongsTo(Promo)

Payment.hasMany(Order)
Order.belongsTo(Payment)

User.hasMany(Order)
Order.belongsTo(User)

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
module.exports = {
  User,
  Product,
  Category,
  Order,
  Promo,
  Payment,
  OrderProducts,
  Wishlist
}
