const mongoose = require('mongoose')
const request = require('supertest')
const app = require('../app')

beforeAll(done => {
  done()
})

afterAll(done => {
  mongoose.connection.close()
  done()
})

describe('Registeration', () => {
  test('If registeration works out', async () => {
    const userToRegister = {
      email: 'alper@gmail.com',
      username: `alper${~~(Math.random()*1000000)}`,
      password: '123123'
    }
    const result = await request(app).post('/auth/register').send(userToRegister)
    expect(result.statusCode).toBe(200)
  })


  test('If throws error when a user already exist', async () => {
    const userToRegister = {
      email: 'alper@gmail.com',
      username: 'alper',
      password: '123123'
    }
    const result = await request(app).post('/auth/register').send(userToRegister)
    expect(result.statusCode).toBe(409)
  })

})

describe('Login', () => {
  test('If login works out', async () => {
    const userToLogin = {
      username: 'alper',
      password: '123123'
    }
    const result = await request(app).post('/auth/login').send(userToLogin)
    expect(result.statusCode).toBe(200)
  })


  test('If wrong username or password returns error', async () => {
    const userToLogin = {
      username: 'alper',
      password: '01231230'
    }
    const result = await request(app).post('/auth/login').send(userToLogin)
    expect(result.statusCode).toBe(403)
  })
})

describe('Token verification', () => {
  test('If it verifies the token', async () => {
    const userToLogin = {
      username: 'alper',
      password: '123123'
    }
    const user = await request(app).post('/auth/login').send(userToLogin)
    const result = await request(app).post('/auth/verify').send(user.body.token)
    expect(result.statusCode).toBe(200)
  })
})

describe('Editing user', () => {
  test('If user can edit account data', async () => {
    const userToLogin = {
      username: 'alper',
      password: '123123'
    }
    const user = await request(app).post('/auth/login').send(userToLogin)
    const editedUser = {
      newUser: {
        email: 'alper1@gmail.com'
      },
      token: user.body.token
    }
    const result = await request(app).patch('/auth/edit').send(editedUser)
    expect(result.statusCode).toBe(200)
  })
})