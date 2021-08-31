const ProductService = require('../../services/product-service')

const deleteComment = async (req, res) => {
  const product = await ProductService.find(req.params.id)
  if(!product) return res.status(false).send('Failed!')

  await ProductService.deleteComment(product, req.params.commentId)
  res.send(product)
}

module.exports = deleteComment