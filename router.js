var express = require('express');
var router = express.Router();

var sessions = require('./sessions');
var messages = require('./messages');

function isAuthenticatedGet() {
    return function(req, res, next) {
        let verified = sessions.verifySession(req);
        if(verified) {
            next();
        } else {
            res.redirect('/login')
        }
    };
};

function isNotAuthenticatedGet() {
    return function(req, res, next) {
        let verified = sessions.verifySession(req);
        if(!verified) {
            next();
        } else {
            res.redirect('/')
        }
    };
};

function isAuthenticatedPost() {
    return function(req, res, next) {
        let verified = sessions.verifySession(req);
        if(verified) {
            next();
        } else {
            res.json(messages.not_logged_in);
        }
    };
};

function isNotAuthenticatedPost() {
    return function(req, res, next) {
        let verified = sessions.verifySession(req);
        if(!verified) {
            next();
        } else {
            res.json(messages.already_logged_in);
        }
    };
};


//With Auth
// router.use('/', isNotAuthenticatedGet(), require('./routes/auth-get'));
// router.use('/', isNotAuthenticatedPost(), require('./routes/auth-post'));

// router.use('/', isNotAuthenticatedGet(), require('./routes/register-get'));
// router.use('/', isNotAuthenticatedPost(), require('./routes/register-post'));

// router.use('/', isAuthenticatedGet(), require('./routes/index-get'));
// router.use('/', isAuthenticatedPost(), require('./routes/index-post'));

// No Auth
router.use('/', require('./routes/auth-get'));
router.use('/', require('./routes/auth-post'));

router.use('/', require('./routes/register-get'));
router.use('/', require('./routes/register-post'));

router.use('/', require('./routes/index-get'));
router.use('/', require('./routes/index-post'));

module.exports = router;