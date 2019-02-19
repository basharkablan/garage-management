var express = require('express');
var session = require('express-session');
var router = express.Router();

var messages = require('../messages');
var models = require("../db/models");
var sessions = require("../sessions");

router.post('/', function (req, res) {
    sessions.removeSession(req);
    var data = messages.success;
    res.send(JSON.stringify(data));
});

module.exports = router;