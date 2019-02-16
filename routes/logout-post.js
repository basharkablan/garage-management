var express = require('express');
var session = require('express-session');
var router = express.Router();

var messages = require('../messages');
var models = require("../db/models");
var sessions = require("../sessions");


// REMOVE THIS COMMENT AFTER CHANGING THE CODE TO LOGOUT
router.post('/', function (req, res) {
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
        var sid = sessions.getNewSession(username);
        console.log("login: " + username + " - " + sid);
        var data = messages.success;
        req.session.sid = sid;
        res.send(JSON.stringify(data));
    });
});

module.exports = router;