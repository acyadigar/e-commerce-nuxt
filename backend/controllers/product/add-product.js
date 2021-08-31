const ProductService = require('../../services/product-service')
const UserService = require('../../services/user-service')

const addProduct = async (req, res) => {
  const user = await UserService.findByUsername(req.body.user.username)
  const product = await ProductService.add(req.body.product)
  await UserService.postProduct(user, product)
  res.send(product)
}

module.exports = addProduct