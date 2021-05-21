const express = require('express');
const morgan = require('morgan');

const {config } = require('../config');
const connectDB = require('./utils/database');

const productsAPI = require('./routes/products.routes');
const signUp = require('./routes/auth/signup.routes');
const signIn = require('./routes/auth/signin.routes');

const app = express();

app.use(morgan('tiny'));
app.use(express.json());

connectDB();

productsAPI(app);
signIn(app);
signUp(app);

app.listen(config.port, () => {
  console.info(`Listening on port ${config.port}`);
});