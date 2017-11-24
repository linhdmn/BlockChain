var express = require('express');
var router = express.Router();
// var bodyParser = require('body-parser');

// var VerifyToken = require(__root + 'auth/VerifyToken');

// router.use(bodyParser.urlencoded({ extended: true }));
var User = require('../../schema/user');
var Wallet = require('../../schema/wallet');
var Transaction = require('../../schema/transactions');
// CREATES A TRANSACTION
router.post('/', function (req, res) {
    User.findOne({ idwalletSender: req.body.sender }, 
        function (err, user) {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('No user found.');
        
        // check if the password is valid
        var passwordIsValid = bcrypt.compareSync(req.body.password, 
            user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, 
            token: null });
        Wallet.findOne({idwallet: req.body.sender}, 
            function(err, money){
                if(err) return res.status(500).send('Error on the server.');
                if(!money) return res.status(404).send('no wallet exist!');

                if(money.money >= req.body.money){
                    Transaction.create({
                        idwalletSender: req.body.sender,
                        idwalletReceiver: req.body.receiver,
                        money: req.body.money
                        }, 
                        function (err, transactions) {
                            if (err) return res.status(500).send("There was a problem adding the information to the database.");
                            res.status(200).send(transactions);
                        });
                }
        })
        // if user is found and password is valid
        // create a token
        var token = jwt.sign({ id: user._id }, config.secret, {
          expiresIn: 86400 // expires in 24 hours
        });
    
        // return the information including token as JSON
        res.status(200).send({ auth: true, token: token });
      });
    
    
});

// RETURNS ALL THE USERS IN THE DATABASE
router.get('/', function (req, res) {
    Transaction.find({}, function (err, users) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(users);
    });
});

// GETS A SINGLE USER FROM THE DATABASE
router.get('/:id', function (req, res) {
    Transaction.findById(req.params.id, function (err, transactions) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!transactions) return res.status(404).send("No user found.");
        res.status(200).send(transactions);
    });
});

// DELETES A USER FROM THE DATABASE
router.delete('/:id', function (req, res) {
    Transaction.findByIdAndRemove(req.params.id, function (err, transactions) {
        if (err) return res.status(500).send("There was a problem deleting the user.");
        res.status(200).send("User: "+ transactions.idwalletSender +" was deleted.");
    });
});



module.exports = router;