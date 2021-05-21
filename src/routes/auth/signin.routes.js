const express = require('express');

const signIn = ( app ) => {
  const router = express.Router();
  app.use('/signin', router);
}

module.exports = signIn;