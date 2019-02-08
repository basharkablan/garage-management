var express = require('express');
var router = express.Router();

router.post('/login',(req, res) => {
    res.send(JSON.stringify({result : 'OK'}));
});

module.exports = router;