const BaseService = require('./base-service')
const UserModel = require('../models/user')

class UserService extends BaseService{
  model = UserModel

  async findByUsername(username) {
    return this.model.findOne({username: username})
  }
    
  async postProduct(user, product) {
    user.products.push(product)
    product.sellers.push(user)
    await user.save()
    await product.save()
  }
}

module.exports = new UserService();
