var express = require('express');
var router = express.Router();

var models = require('../db/models');

router.get('/', (req, res) => {
    res.send(JSON.stringify({result : 'OK'}));
});

module.exports = router;