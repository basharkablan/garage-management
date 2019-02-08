var express = require('express');
var router = express.Router();

var messages = require('../messages');

router.post('/login',(req, res) => {
    username = req.body.username;
    password = req.body.password;

    console.log(username + " - " + password);

    res.send(JSON.stringify(messages.wrong_cred));
});

module.exports = router;