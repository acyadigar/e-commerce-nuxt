const ProductService = require('../../services/product-service')

const allProducts =  async (req, res) => {
  const products = await ProductService.findAll()
  res.render("data", {data: products})
}

module.exports = allProducts
