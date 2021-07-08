const router = require('express').Router()
const AuthService = require('../services/auth-service')

router.post('/register', async (req, res) => {
  const user = await AuthService.register(req.body)
  if (!user) return res.status(409).send('User already exist!')
  
  res.send(user)
})

router.post('/login', async (req, res) => {
  const user = await AuthService.login(req.body)
  if (!user) return res.status(404).send('Username or password is not correct!')

  res.send(user)
})

router.post('/verify', async (req, res) => {
  const token = await AuthService.check(req.body.token)
  if (!token) return res.status(false).send('Verify error!')

  res.send(token)
})

router.patch('/edit', async (req, res) => {
  const decodedToken = await AuthService.check(req.body.token)
  if (!decodedToken) return res.status(false).send('Verify error!')

  const user = await AuthService.updateUser(decodedToken, req.body.newUser)
  res.send(user)
})

module.exports = router