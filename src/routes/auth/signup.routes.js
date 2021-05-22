const express = require('express');
const AuthService = require('../../services/auth.service');
const { checkDuplicateUsernameOrEmail } = require('../../middlewares/verifySignup');

const signUp = ( app ) => {
  const router = express.Router();
  app.use('/signup', router);

  const authService = new AuthService();

  router.post('/',  checkDuplicateUsernameOrEmail,async (req, res, next) => {
    const { body: data } = req;

    try{
      const token = await authService.register(data);

      res
        .status(200)
        .json({
          token: token,
          message: 'register succesfully'
        });
    }catch(err){
      next(err);
    }
  });
}

module.exports = signUp;