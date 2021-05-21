const User = require('./models/User');
const Role = require('./models/Role');
const { comparePassword } = require('../utils/encryptPass');

class Auth{
  async register(dataUser){
    if(dataUser.roles){
      const findRole = await Role.find({name: { $in: dataUser.roles }});
      dataUser.roles = findRole.map(role => role._id);
    }else{
      const role = await Role.findOne({ name: 'user' });
      dataUser.roles = [role._id];
    }
    const userData = await new User(dataUser).save();
    return userData;
  }

  async signin(dataUser){
    const userFound = await User.findOne({ email: dataUser.email });
    if(!userFound) {
      return {
        status: 'failed',
        message: 'User not found'
      }
    };

    const matchPass = await comparePassword(dataUser.password, userFound.password);
    if(!matchPass){
      return {
        status: 'failed',
        message: 'Incorrect Password'
      }
    }

    return {
      status: 'done',
      message: 'Login succesfully',
      data: userFound
    }
  }

  async checkUserId(id){
    const user = await User.findById(id, { password: 0 });
    return user ? user : false;
  }

  async checkRole(user){
    const roles = await Role.find({ _id: { $in: user.roles } });
    console.log(roles);
    return roles;
  }
}

module.exports = Auth;