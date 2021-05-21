const Auth = require('../lib/auth.lib');
const User = require('../lib/models/User');

class AuthService{
  constructor(){
    this.auth = new Auth();
  }

  async register(data){
    const { username, email, password, roles } = data;

    const dataUser = {
      username,
      email,
      password: await User.encryptPassword(password)
    };
    console.log(dataUser);
    const newUser = await this.auth.register(dataUser);

    // const token = jwt.sign(
    //   { id: newUser._id }, 
    //   'TOKEN', 
    //   { expiresIn: 86400 }
    // );

    return newUser;
  }
}

module.exports = AuthService;