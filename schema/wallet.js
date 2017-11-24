var mongoose = require('mongoose');


var WalletSchema = new mongoose.Schema({  
  idwallet: {
    type: String,
    unique: true,
    required: true
  },
  accountbalance: {
    type: Number,
    required: true
  }
});
mongoose.model('wallets', WalletSchema);

module.exports = mongoose.model('wallets');