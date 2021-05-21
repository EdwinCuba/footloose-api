const express = require('express');
const AuthService = require('../../services/auth.service');

const signIn = ( app ) => {
  const router = express.Router();
  app.use('/signin', router);

  const authService = new AuthService();

  router.post('/', async (req, res, next) => {
    const { body: data } = req;

    try{
      const token = await authService.signin(data);

      res
        .status(200)
        .json(token);
    }catch(err){
      next(err);
    }
  });
}

module.exports = signIn;