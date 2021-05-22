const AuthService = require('../services/auth.service');

const verifyRolesExist = async (req, res, next) => {
  const authService = new AuthService();
  const {roles} = req.body;
  
  try{
    if(roles){
      const exist = await authService.verifyRoles(roles);
      if(exist.status === 'failed'){
        res
          .status(400)
          .json(exist);
      }else{
        next()
      }
    }else{
      res
        .json({
          message: 'Need to specify a role'
        });
    }
  }catch(err){
    next(err);
  }
}

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  const authService = new AuthService();
  const { username, email } = req.body;

  try {
    const verifyDuplicate = await authService.verifyDuplicate(username, email);
    if(verifyDuplicate.status === 'failed'){
      res
        .status(400)
        .json(verifyDuplicate);
    }else{
      next();
    }

  } catch (err) {
    next(err);
  }
}

module.exports = {
  verifyRolesExist,
  checkDuplicateUsernameOrEmail
};