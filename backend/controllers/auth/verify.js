const AuthService = require('../../services/auth-service')

const verify = async (req, res) => {
  const token = await AuthService.check(req.body.token)
  if (!token) return res.status(false).send('Verify error!')

  res.send(token)
}

module.exports = verify