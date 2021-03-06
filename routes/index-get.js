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
        }
        res.send(str);
    })
});

router.get('/brands', (req, res) => {
    var brands = models.brand;

    brands.find((err, result) => {
        if(err) throw err;

        let str = "";

        for (let i=0; i < result.length; i++) {
            str = str + result[i]['brandName'] + "</br>";
        }
        res.send(str);
    })
});


module.exports = router;