var express = require('express');
var router = express.Router();

router.get('/',(req, res) => {
    res.sendFile(__basedir + '/html/login.html');
});

module.exports = router;