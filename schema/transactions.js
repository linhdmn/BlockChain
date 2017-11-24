var mongoose = require('mongoose');  
var TransactionSchema = new mongoose.Schema({
  idwalletSender: {
    type: String,
    required: true
  },
  idwalletReceiver:{
    type: String,
    required: true
  },
  money:{
    type: Number,
    required: true
  }
});


mongoose.model('transactions', TransactionSchema);
module.exports = mongoose.model('transactions');