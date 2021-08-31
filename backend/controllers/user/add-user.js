const UserService = require('../../services/user-service')

const addUser = async (req, res) => {
  const user = await UserService.add(req.body)
  res.send(user)
}

module.exports = addUser