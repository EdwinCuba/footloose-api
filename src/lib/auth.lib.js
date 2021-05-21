const User = require('./models/User')

class Auth{
  async register(dataUser){
    const userData = await new User(dataUser).save();
    return userData;
  }
}

module.exports = Auth;