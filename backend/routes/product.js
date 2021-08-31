const router = require('express').Router()

const allProducts = require('../controllers/product/all-products')
const paginateProducts = require('../controllers/product/paginate-products')
const findProduct = require('../controllers/product/find-product')
const addProduct = require('../controllers/product/add-product')
const deleteProduct = require('../controllers/product/delete-product')
const updateProduct = require('../controllers/product/update-product')
const comment = require('../controllers/product//comment')
const deleteComment = require('../controllers/product/delete-comment')

router.get('/all', allProducts)
router.get('/all/paginated', paginateProducts)
router.get('/:id', findProduct)
router.post('/:id/comment', comment)
router.delete('/:id/comment/:commentId', deleteComment)
router.post('/', addProduct)
router.patch('/:id', updateProduct)
router.delete('/:id', deleteProduct)

module.exports = router