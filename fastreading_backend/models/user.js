const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\S+@\S+\.\S+$/
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  },
  roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }]
});

const User = mongoose.model('User', userSchema);

module.exports = User
