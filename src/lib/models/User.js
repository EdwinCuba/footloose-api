const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  username: {
    type: String
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  roles: [
    {
      ref: 'Role',
      type: Schema.Types.ObjectId
    }
  ]
},
{
  timestamps: true,
  versionKey: false
});

userSchema.statics.encryptPassword = async ( password ) => {
  const salt = await bcrypt.genSalt(10);
  const encryptedPass = await  bcrypt.hash(password, salt);
  return encryptedPass;
}

userSchema.statics.comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword);
}

module.exports = model('User', userSchema);