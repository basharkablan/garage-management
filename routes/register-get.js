var express = require('express');
var router = express.Router();

router.get('/register', (req, res) => {
    res.sendFile(__basedir + '/html/register.html');
});

module.exports = router;