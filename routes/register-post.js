var express = require('express');
var router = express.Router();

router.post('/register', (req, res) => {
    //res.sendFile(__basedir + '/html/register.html');
    res.send(JSON.stringify({result: 'OK'}));
});

module.exports = router;