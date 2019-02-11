var express = require('express');
var router = express.Router();

var messages = require('../messages');

router.post('/register', (req, res) => {
    //res.sendFile(__basedir + '/html/register.html');
    res.send(JSON.stringify(messages.success));
});

module.exports = router;