var mongoose = require('mongoose');
var Promise = mongoose.connect('mongodb://127.0.0.1:27017/BlockChain', 
                { useMongoClient: true })
                .then(console.log("Database connected!"));

//mongodb://nhatlinhdoan:Nhatlinh96!@ds045064.mlab.com:45064/btcn4
//mongodb://127.0.0.1:27017/BlockChain