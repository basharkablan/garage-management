var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/';

router.get('/codes', (req, res) => {
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        dbo = db.db("obd2_codes");
        dbo.collection('codes').find().toArray(function(err, result) {
            if (err) throw err;

            let str = "";

            for (let i=0; i < result.length; i++) {
                str = str + result[i]['code'] + " - " + result[i]['error'] + "</br>";
            }
            res.send(str);
            
            db.close();
        });
    }); 
});

router.get('/login',(req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});

router.post('/login',(req, res) => {
    res.send(JSON.stringify({result : 'OK'}));
});

router.get('/register', (req, res) => {
    res.sendFile(__dirname + '/public/register.html');
});

router.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

module.exports = router;