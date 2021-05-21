const express = require('express');
const AuthService = require('../../services/auth.service');

const signUp = ( app ) => {
  const router = express.Router();
  app.use('/signup', router);

  const authService = new AuthService();

  router.post('/', async (req, res, next) => {
    const { body: data } = req;

    try{
      const a = await authService.register(data);

      res
        .status(200)
        .json({
          data: a,
          message: 'register succesfully'
        });
    }catch(err){
      next(err);
    }
  });
}

module.exports = signUp;