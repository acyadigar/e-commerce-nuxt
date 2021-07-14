const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
  image: String,
  title: String,
  price: String,
  info: String,
  comments: Array,
  sellers: [{
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      autopopulate: {
        maxDepth: 1
      }
    }]
})

ProductSchema.plugin(require('mongoose-autopopulate'))

const ProductModel = mongoose.model('Product', ProductSchema)

module.exports = ProductModel