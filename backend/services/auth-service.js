require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

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

  async hashUser(user) {    
    const hashedPassword = await bcrypt.hash(user.password, 8)
    user.password = hashedPassword
    return user
  }

  async login(userInput, user) {
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
}

module.exports = new AuthService()