const UserService = require('../../services/user-service')

const deleteUser = async (req, res) => {
  const user = await UserService.del(req.params.id)
  res.send(user)
}

module.exports = deleteUser