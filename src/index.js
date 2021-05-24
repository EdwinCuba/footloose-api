const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const {config } = require('../config');
const connectDB = require('./lib/database');
const createRoles = require('./lib/inistialSetup');

const productsAPI = require('./routes/products.routes');
const usersAPI = require('./routes/user.routes');
const signUp = require('./routes/auth/signup.routes');
const signIn = require('./routes/auth/signin.routes');
const brandsAPI = require('./routes/brands.routes.js');

const app = express();

app.use(morgan('tiny'));
app.use(express.json());
app.use(cors());

connectDB();
createRoles();

productsAPI(app);
usersAPI(app);
brandsAPI(app);
signIn(app);
signUp(app);

app.listen(config.port, () => {
  console.info(`Listening on port ${config.port}`);
});