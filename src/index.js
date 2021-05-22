const express = require('express');
const morgan = require('morgan');

const {config } = require('../config');
const connectDB = require('./lib/database');
const createRoles = require('./lib/inistialSetup');

const productsAPI = require('./routes/products.routes');
const usersAPI = require('./routes/user.routes');
const signUp = require('./routes/auth/signup.routes');
const signIn = require('./routes/auth/signin.routes');

const app = express();

app.use(morgan('tiny'));
app.use(express.json());

connectDB();
createRoles();

productsAPI(app);
usersAPI(app);
signIn(app);
signUp(app);

app.listen(config.port, () => {
  console.info(`Listening on port ${config.port}`);
});