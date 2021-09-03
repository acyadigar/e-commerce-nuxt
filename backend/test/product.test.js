const mongoose = require('mongoose')
const request = require('supertest')
const app = require('../app')
const UserService = require('../services/user-service')
const ProductService = require('../services/product-service')

beforeAll(done => {
  done()
})

afterAll(done => {
  mongoose.connection.close()
  done()
})

describe('Product route testing', () => {
  test('If creating and populating product works', async () => {
    const userToLogin = {
      username: 'alper',
      password: '123123'
    }
    const productToCreate = {
      title: 'Best product ever',
      price: 123,
      info: 'Information about the best product',
      category: 'Sports',
    }
    const productData = {
      user: {
        ...userToLogin
      },
      product: {
        ...productToCreate
      }
    }

    const result = await request(app).post('/product').send(productData)
    const createdProduct = result.body

    const isCreated = await ProductService.find(createdProduct._id)
    const user = await UserService.findByUsername(productData.user.username)
    const isPopulated = user.products.find(product => product._id == createdProduct._id)

    expect(result.statusCode).toBe(200)
    expect(isCreated).toBeTruthy()
    expect(isPopulated).toBeTruthy()
  })


  test('If deleting product works', async () => {
    const user = await UserService.findByUsername('alper')
    const productToDelete = user.products[user.products.length - 1]
    const result = await request(app).delete(`/product/${productToDelete._id}`)

    expect(result.statusCode).toBe(200)
  })
})