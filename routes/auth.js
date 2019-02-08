var express = require('express');
var router = express.Router();

router.get('/login',(req, res) => {
    res.sendFile(__basedir + '/html/login.html');
});

router.post('/login',(req, res) => {
    res.send(JSON.stringify({result : 'OK'}));
});

module.exports = router;