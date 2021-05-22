const AuthService = require('../services/auth.service');

const verifyToken =  async ( req, res, next) => { //eslint-disable-line
  const authService = new AuthService();

  const token = req.headers['x-access-token'];

  if(!token){
    return res
      .status(401)
      .json({
        message: 'No token provided'
      });
  }

  const verify = await authService.verifyAccessToken(token);
  if(!verify){
    return res
      .status(401)
      .json({
        status: 'failed',
        message: 'The token is incorrect or not exist'
      })
  }

  next();
}

const isModerator =async (req, res, next) => {
  const authService = new AuthService();

  const token = req.headers['x-access-token'];

  const verify = await authService.verifyIsModerator(token);
  if(!verify){
    return res
      .status(403)
      .json({
        status: 'failed',
        message: 'Need to be a moderator'
      })
  }

  next();
}

const isAdmin = async (req, res, next) => {
  const authService = new AuthService();

  const token = req.headers['x-access-token'];

  const verify = await authService.verifyIsAdmin(token);
  if(!verify){
    return res
      .status(403)
      .json({
        status: 'failed',
        message: 'Need to be a admin'
      })
  }

  next();
}

module.exports = {
  verifyToken,
  isAdmin,
  isModerator
};  