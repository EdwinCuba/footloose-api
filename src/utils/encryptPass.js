const bcrypt = require('bcryptjs');

const encryptPassword = async ( password ) => {
  const salt = await bcrypt.genSalt(10);
  const encryptedPass = await  bcrypt.hash(password, salt);
  return encryptedPass;
}

const comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword);
}

module.exports= {
  encryptPassword,
  comparePassword
}