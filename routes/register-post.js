var express = require('express');
var router = express.Router();

var messages = require('../messages');

router.post('/register', (req, res) => {
    //res.sendFile(__basedir + '/html/register.html');

    let first = req.body.firstName;
    let last = req.body.lastName;
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;

    if(first == undefined || last == undefined || username == undefined || email == undefined || password == undefined ) {
        res.send(JSON.stringify(messages.missing_field));
        return;
    }


    res.send(JSON.stringify(messages.success));
});

module.exports = router;