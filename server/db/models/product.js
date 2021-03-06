const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  image: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  stock: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  origin: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Product
