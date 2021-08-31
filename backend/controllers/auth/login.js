const AuthService = require('../../services/auth-service')
const UserService = require('../../services/user-service')

const login = async (req, res) => {
  const validUser = await UserService.findByUsername(req.body.username)
  if(!validUser) return res.status(404).send('Username or password is not correct!')

  const user = await AuthService.login(req.body, validUser)
  if(!user) return res.status(404).send('Username or password is not correct!')

  res.send(user)
}

module.exports = login