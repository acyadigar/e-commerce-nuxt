const BaseService = require("./base-service");
const ProductModel = require("../models/product");

class ProductService extends BaseService {
  model = ProductModel;

  async findQuery(query) {
    return this.model.find({'title': {'$regex': query, '$options': 'i'}})
  }

  async findCategory(query) {
    return this.model.find({'category': query})
  }

  async addComment(product, comment) {
    comment.id = product.comments.length + 1
    
    product.comments.push(comment)
    await product.save()
  }

  async deleteComment(product, commentId) {
    const comment = product.comments.find(comment => comment.id == commentId)
    product.comments.splice(product.comments.indexOf(comment), 1)

    await product.save()
  }
}

module.exports = new ProductService();
