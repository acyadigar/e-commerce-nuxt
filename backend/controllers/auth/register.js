const AuthService = require('../../services/auth-service')
const UserService = require('../../services/user-service')

const register = async (req, res) => {
  const isAlreadyRegistered = await UserService.findByUsername(req.body.username)
  if (isAlreadyRegistered) return res.status(409).send('User already exist!')

  const hashedUser = await AuthService.hashUser(req.body)
  let user = await UserService.add(hashedUser)
  const token = await AuthService.signToken(user)
  user = {
    email: user.email,
    username: user.username,
    token
  }

  res.send(user)
}

module.exports = register