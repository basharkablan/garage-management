var express = require('express');
var session = require('express-session');
var router = express.Router();

var messages = require('../messages');
var models = require("../db/models");
var reset_sessions = require("../reset_sessions");



router.post('/', function (req, res) {
    email = req.body.email;
    
    if(email == undefined || email.trim() == "") {
        res.send(JSON.stringify(messages.missing_field));
        return;
    }

    models.user.findOne({email: email}, (err, result) => {
        if(err) {
            console.log(err);
            res.send(JSON.stringify(messages.server_internal_error));
            return;
        }
        if(result == undefined) {
            res.send(JSON.stringify(messages.wrong_email));
            return;
        }
        console.log("reset: " + email);
        var data = messages.success;
        reset_sessions.getNewSession(req, email);
        res.send(JSON.stringify(data));
    });
});

router.post('/password', function (req, res) {
    email = req.body.email;
    
    password = req.body.password;
    confirm = req.body.confirm;

    if(password == undefined || password.trim() == "" || confirm == undefined || confirm.trim() == "") {
        res.send(JSON.stringify(messages.missing_field));
        return;
    }

    if(email == undefined || email.trim() == "") {
        res.send(JSON.stringify(messages.wrong_cred));
        return;
    }

    if(!reset_sessions.verifySession(req, email)) {
        res.send(JSON.stringify(messages.session_timeout));
        reset_sessions.removeSession(req);
        return;
    }

    if(password != confirm) {
        res.send(JSON.stringify(messages.passwords_mismatch));
        return;
    }

    models.user.updateOne({email: email}, {password: password}, (err, result) => {
        if(err) {
            console.log(err);
            res.send(JSON.stringify(messages.server_internal_error));
            return;
        }
        if(result == undefined) {
            res.send(JSON.stringify(messages.wrong_email));
            return;
        }

        console.log("password reset: " + email);
        var data = messages.success;
        res.send(JSON.stringify(data));
    });
});

module.exports = router;