const Auth = require('../lib/auth.lib');
const jwt = require('jsonwebtoken');
const { encryptPassword } = require('../utils/encryptPass');
const { config } = require('../../config');

class AuthService{
  constructor(){
    this.auth = new Auth();
  }

  generateToken(_id) {
    const token = jwt.sign(
      { id: _id }, 
      config.secret, 
      { expiresIn: 86400 }
    );

    return token
  }

  async register(data){
    const { username, email, password, roles } = data;

    const dataUser = {
      username,
      email,
      password: await encryptPassword(password),
      roles
    };
  
    const newUser = await this.auth.register(dataUser);

    

    return this.generateToken(newUser._id);
  }

  async signin(data) {
    const {email, password} = data;

    const dataUser = {
      email,
      password
    }

    const logUser = await this.auth.signin(dataUser);
    if(logUser.status === 'failed'){
      return logUser;
    }else{
      return {
        token: this.generateToken(logUser.data._id),
        message: 'Login succefully'
      };
    }

  }

  async verifyAccessToken(token){
    try{
      const decoded =  jwt.verify(token, config.secret);;
      const user = await this.auth.checkUserId(decoded.id);
      if(!user){
        return false;
      }
      return true;
    }catch(err){
      console.log('Token unauthorized')
    }
  }

  async verifyIsModerator(token){
    try{
      const decoded =  jwt.verify(token, config.secret);;
      const user = await this.auth.checkUserId(decoded.id);
      if(!user){
        return false;
      }

      const role = await this.auth.checkRole(user);
      for(let i = 0; i < role.length; i++){
        if(role[i].name === 'moderator'){
          return true;
        }
      }

      return false;
    }catch(err){
      console.log('Need to be a moderator');
    }
  }

  async verifyIsAdmin(token){
    try{
      const decoded =  jwt.verify(token, config.secret);;
      const user = await this.auth.checkUserId(decoded.id);
      if(!user){
        return false;
      }

      const role = await this.auth.checkRole(user);
      for(let i = 0; i < role.length; i++){
        if(role[i].name === 'admin'){
          return true;
        }
      }

      return false;
    }catch(err){
      console.log('Need to be an admin');
    }
  }

  async verifyRoles(roles){
    for(let i = 0; i < roles.length; i++){
      if(!config.roles.includes(roles[i])){
        return {
          status: 'failed',
          message: `the role ${roles[i]} not exist`
        };
      }
    }

    return true;
  }

  async verifyDuplicate(username, email){
    const isUsernameDuplicate = await this.auth.checkUsername(username);
    if(isUsernameDuplicate){
      return {
        status: 'failed',
        message: 'the username already exists'
      }
    }

    const isEmailDuplicate = await this.auth.checkEmail(email);
    if(isEmailDuplicate){
      return {
        status: 'failed',
        message: 'the email already exists'
      }
    }
    return true;
  }
}

module.exports = AuthService;