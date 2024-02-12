const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (password) {
        return passwordRegex.test(password);
      },
      message: props => `${props.value} is not a valid password. Please make sure your password contains at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*).`
    }
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review',
    },
  ],
  favorites: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Restaurant',
    },
  ],
});

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;
