var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(__basedir + '/html/register.html');
});

module.exports = router;