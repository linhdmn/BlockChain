var express = require('express');
var router = express.Router();
// var bodyParser = require('body-parser');

// var VerifyToken = require(__root + 'auth/VerifyToken');

// router.use(bodyParser.urlencoded({ extended: true }));
var Transaction = require('../../schema/transactions');
// CREATES A TRANSACTION
router.post('/', function (req, res) {
    Transaction.create({
        idwalletSender:req.body.sender,
        idwalletReceiver:req.body.receiver,
        money:req.body.money
    }, function(err, transaction){
        if(err) return res.status(500).send("Oppss");
        res.status(200).send(transaction);
    })
});

router.post('/findSentByUser', function(req, res){
    Transaction.find({idwalletSender: req.body.idwallet}, function(err, transaction){
        if(err) return res.status(500).send("Ooppss!!");
        res.status(200).send(transaction);
    })
})

router.post('/findReceiveByUser', function(req, res){
    Transaction.find({idwalletReceiver: req.body.idwallet}, function(err, transaction){
        if(err) return res.status(500).send("Ooppss!!");
        res.status(200).send(transaction);
    })
})

router.get('/getAll', function(req, res){
    Transaction.find({}, function(err, data){
        if(err) return res.status(500).send("Oppsss!");
        res.status(200).send(data);
    })
})

// RETURNS  THE USER Transaction IN THE DATABASE
router.get('/', function (req, res) {
    Transaction.find({idwalletSender:req.body.sender}, 
        function (err, users) {
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