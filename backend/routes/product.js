const router = require('express').Router()

const UserService = require('../services/user-service')
const ProductService = require('../services/product-service')

router.get('/all', async (req, res) => {
  const products = await ProductService.findAll()
  res.render("data", {data: products})
})

router.get('/all/paginated', async (req, res) => {
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
})

router.get('/:id', async (req, res) => {
  const product = await ProductService.find(req.params.id)
  if(!product) return res.status(404).send('No product exists!')

  res.send(product)
})

router.post('/:id/comment', async (req, res) => {
  const product = await ProductService.find(req.params.id)
  if(!product) return res.status(false).send('Failed!')

  await ProductService.addComment(product, req.body.comment)

  res.send(product)
})

router.delete('/:id/comment/:commentId', async (req, res) => {
  const product = await ProductService.find(req.params.id)
  if(!product) return res.status(false).send('Failed!')

  await ProductService.deleteComment(product, req.params.commentId)
  res.send(product)
})

router.post('/', async (req, res) => {
  const user = await UserService.findByUsername(req.body.user.username)
  const product = await ProductService.add(req.body.product)
  await UserService.postProduct(user, product)
  res.send(product)
})

router.patch('/:id', async (req, res) => {
  await ProductService.update(req.params.id, req.body)
  const updatedproduct = await ProductService.find(req.params.id)
  res.send(updatedproduct)
})

router.delete('/:id', async (req, res) => {
  const product = await ProductService.del(req.params.id)
  res.send(product)
})

module.exports = router