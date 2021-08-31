const ProductService = require('../../services/product-service')

async function deleteProduct (req, res) {
  const product = await ProductService.del(req.params.id)
  res.send(product)
}

module.exports = deleteProduct