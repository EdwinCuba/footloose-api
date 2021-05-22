const express = require('express');
const { verifyToken, isAdmin } = require('../middlewares/auth.jwt');
const {verifyRolesExist, checkDuplicateUsernameOrEmail} = require('../middlewares/verifySignup');

const usersAPI = (app) => {
  const router = express.Router();
  app.use('/api/users', router);

  router.post('/', [verifyToken, isAdmin, verifyRolesExist, checkDuplicateUsernameOrEmail], (req, res) => {
    res.json({
      message: 'User creating'
    })
  });
}

module.exports = usersAPI;