const ProductService = require('../../services/product-service')

const paginateProducts = async (req, res) => {
  let products;
  if(req.query.search) {
    products = await ProductService.findQuery(req.query.search)
  } 
  else if (req.query.category) {
    products = await ProductService.findCategory(req.query.category)
  }
  else {
    products = await ProductService.findAll()
  }
  products = products.reverse()
  const productsLength = products.length

  // pagination variables
  const {page, perPage} = req.query
  const to = page * perPage
  const from = to - perPage

  products = products.slice(from, to)
  products = {products, productsLength}
  res.send(products)
}

module.exports = paginateProducts