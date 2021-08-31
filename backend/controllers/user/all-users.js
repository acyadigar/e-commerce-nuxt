const UserService = require('../../services/user-service')

const allUsers = async (req, res) => {
  const users = await UserService.findAll()
  res.render("data", {data: users})
}

module.exports = allUsers