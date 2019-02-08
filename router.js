var express = require('express');
var router = express.Router();

router.use('/', require('./routes/auth'));

router.use('/', require('./routes/register'));

router.use('/', require('./routes/index'));

module.exports = router;