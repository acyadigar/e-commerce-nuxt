const AuthService = require('../../services/auth-service')
const UserService = require('../../services/user-service')

const edit = async (req, res) => {
  const decodedToken = await AuthService.check(req.body.token)
  if (!decodedToken) return res.status(false).send('Verify error!')

  const user = await UserService.findByUsername(decodedToken.username)
  let newUser = await UserService.update(user._id, req.body.newUser)
  const newToken = AuthService.signToken(newUser)

  newUser = {
    username: newUser.username, 
    email: newUser.email, 
    token: newToken
  }
  res.send(newUser)
}

module.exports = edit