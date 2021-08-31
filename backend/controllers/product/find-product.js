const ProductService = require('../../services/product-service')

const findProduct = async (req, res) => {
  const product = await ProductService.find(req.params.id)
  if(!product) return res.status(404).send('No product exists!')

  res.send(product)
}

module.exports = findProduct