var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/';

app.use('/static', express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.route('/codes').get((req, res) => {
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

app.get('/login',(req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});

app.post('/login',(req, res) => {
    res.send(JSON.stringify({result : 'OK'}));
});

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/public/register.html');
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

var server = app.listen(3000, () => { console.log("Server is Listening on port 3000...")});