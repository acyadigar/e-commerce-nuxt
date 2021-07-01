require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const UserService = require('../services/user-service')

class AuthService{
  signToken(user) {
    const token = jwt.sign({email: user.email, username: user.username},
      process.env.JWT_SECRET,
      {expiresIn: '1d'})
    return token
  }
  
  check(token) {
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
      return decodedToken
    } catch(error) {
      return error
    }
  }

  async register(user) {
    const isAlreadyRegistered = await UserService.findByUsername(user.username)
    if (isAlreadyRegistered) return
    
    const hashedPassword = await bcrypt.hash(user.password, 8)
    user.password = hashedPassword
    const registeredUser = await UserService.add(user)
    const token = this.signToken(registeredUser)

    const newUser = {
      email: registeredUser.email,
      username: registeredUser.username,
      token
    }
    return newUser
  }

  async login(userInput) {
    let user = await UserService.findByUsername(userInput.username)
    if(!user) return

    const validUser = await bcrypt.compare(userInput.password, user.password)
    if (!validUser) return

    const token = this.signToken(user)
    user = {
      email: user.email,
      username: user.username,
      token
    }
    return user
  }

  async updateUser(token, updatedUser) {
  const user = await UserService.findByUsername(token.username)
  let newUser = await UserService.update(user._id, updatedUser)
  const newToken = this.signToken(newUser)
  
  newUser = {username: newUser.username, email: newUser.email, token: newToken} 
  return newUser
  }
}

module.exports = new AuthService()