var mongoose = require('mongoose');
var Promise = mongoose.connect('mongodb://127.0.0.1:27017/BlockChain', 
                { useMongoClient: true })
                .then(console.log("Database connected!"));