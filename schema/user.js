var mongoose = require('mongoose');  
var UserSchema = new mongoose.Schema({
  email:  {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  idwallet: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['Member', 'Guest', 'Owner', 'Admin'],
    default: 'Member'
  }
});


mongoose.model('users', UserSchema);
module.exports = mongoose.model('users');