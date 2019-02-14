var express = require('express');
var router = express.Router();

var messages = require('../messages');
var models = require('../db/models');

router.post('/', (req, res) => {

    let first = req.body.firstName;
    let last = req.body.lastName;
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;

    if(first == undefined || last == undefined || username == undefined || email == undefined || password == undefined ) {
        res.send(JSON.stringify(messages.missing_field));
        return;
    }
    var user = new models.user({firstName : first, lastName : last, email : email, username : username, password : password});
    user.save(function (err, user) {
        if(err) {
            console.log(err);
            res.send(JSON.stringify(messages.server_internal_error));
            return;
        }

        console.log("registered: " + first + " " + last + ", " + username + ", " + email + ", " + password);
        res.send(JSON.stringify(messages.success));
    });
});

module.exports = router;