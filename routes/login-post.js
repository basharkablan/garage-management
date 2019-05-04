var express = require('express');
var session = require('express-session');
var router = express.Router();

var messages = require('../messages');
var models = require("../db/models");
var sessions = require("../sessions");



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
        var sid = sessions.getNewSession(req, result.username);
        console.log("login: " + result.username + " - " + sid);
        var data = {};
        data.status = messages.success.status;
        data.message = messages.success.message;
        data["username"] = result.username;
        res.send(JSON.stringify(data));
    });
});

module.exports = router;