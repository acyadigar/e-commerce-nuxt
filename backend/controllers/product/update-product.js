const ProductService = require('../../services/product-service')

const updateProduct = async (req, res) => {
  await ProductService.update(req.params.id, req.body)
  const updatedproduct = await ProductService.find(req.params.id)
  res.send(updatedproduct)
}

module.exports = updateProduct