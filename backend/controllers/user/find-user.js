const UserService = require('../../services/user-service')

const findUser = async (req, res) => {
  const user = await UserService.findByUsername(req.params.id)
  if(!user) return res.status(404).send('No user exists!')
  res.send(user)
}

module.exports = findUser