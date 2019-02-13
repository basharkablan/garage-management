var express = require('express');
var router = express.Router();

var messages = require('../messages');
var models = require("../db/models");

router.post('/login', function (req, res) {
    username = req.body.username;
    password = req.body.password;

    if(username == undefined || password == undefined || username.trim() == "" || password.trim() == "") {
        res.send(JSON.stringify(messages.missing_field));
        return;
    }

    models.user.findOne({username : username, password : password}, (err, result) => {
        if(err) {
            console.log(err);
            res.send(JSON.stringify(messages.server_internal_error));
            return;
        }
        if(result == undefined) {
            res.send(JSON.stringify(messages.wrong_cred));
            return;
        }
        console.log("login: " + username + " - " + password);
        res.send(JSON.stringify(messages.success));
    });
});

module.exports = router;