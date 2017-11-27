var express = require('express');
var router = express.Router();
// var bodyParser = require('body-parser');

// var VerifyToken = require(__root + 'auth/VerifyToken');

// router.use(bodyParser.urlencoded({ extended: true }));
var Wallet = require('../../schema/wallet');

// CREATES A NEW USER
router.post('/create', function (req, res) {
    Wallet.create({
            email : req.body.email,
			password : req.body.password,	
        }, 
        function (err, user) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(user);
        });
    
});

// RETURNS USER WALLET IN THE DATABASE
router.post('/', function (req, res) {
    Wallet.find({idwallet:req.body.idwallet}, 
        function (err, users) {
            if (err) return res.status(500).send("There was a problem finding the users.");
            res.status(200).send(users);
    });
});

// GETS A SINGLE USER FROM THE DATABASE
router.get('/:id', function (req, res) {
    Wallet.findById(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        res.status(200).send(user);
    });
});

router.get('/:id', function (req, res) {
    Wallet.findById(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        res.status(200).send(user);
    });
});

// DELETES A USER FROM THE DATABASE
router.delete('/:id', function (req, res) {
    Wallet.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem deleting the user.");
        res.status(200).send("User: "+ user.name +" was deleted.");
    });
});

// UPDATES A SINGLE USER IN THE DATABASE
// Added VerifyToken middleware to make sure only an authenticated user can put to this route


router.put('/updateMoney', function(req, res){
    Wallet.findOneAndUpdate({idwallet:req.body.idwallet},{accountbalance: req.body.money},{new: true},
    function(err, wallet){
        if(err) return res.status(500).send("Oppss!!!");
        res.status(200).send(wallet);
    })
})

module.exports = router;