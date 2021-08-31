const ProductService = require('../../services/product-service')

const comment = async (req, res) => {
  const product = await ProductService.find(req.params.id)
  if(!product) return res.status(false).send('Failed!')

  await ProductService.addComment(product, req.body.comment)

  res.send(product)
}

module.exports = comment