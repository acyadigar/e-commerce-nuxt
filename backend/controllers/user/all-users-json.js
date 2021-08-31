const UserService = require('../../services/user-service')

const allUsersJson = async (req, res) => {
  const users = await UserService.findAll()
  res.status(202).send(users)
}

module.exports = allUsersJson