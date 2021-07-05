const BaseService = require("./base-service");
const ProductModel = require("../models/product");

class ProductService extends BaseService {
  model = ProductModel;

  async findQuery(query) {
    return this.model.find({'title': {'$regex': query, '$options': 'i'}})
  }
}

module.exports = new ProductService();
