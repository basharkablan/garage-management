var express = require('express');
var router = express.Router();

var models = require('../db/models');

router.get('/', (req, res) => {
    res.sendFile(__basedir + '/html/index.html');
});

router.get('/codes', (req, res) => {
    var codes = models.code;

    codes.find((err, result) => {
        if(err) throw err;

        let str = "";

        for (let i=0; i < result.length; i++) {
            str = str + result[i]['code'] + " - " + result[i]['error'] + "</br>";
            // str = str + "(new models.code({code : \"" + result[i]['code'] + "\", error : \"" + result[i]['error'] + "\"})).save(code_insert_callback);" + "</br>";
        }
        res.send(str);
    })
});


module.exports = router;