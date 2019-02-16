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
            res.redirect('/login');
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

router.use('/login', isNotAuthenticatedGet(), require('./routes/login-get'));
router.use('/login', isNotAuthenticatedPost(), require('./routes/login-post'));

router.use('/logout', isAuthenticatedPost(), require('./routes/logout-post'));

router.use('/register', isNotAuthenticatedGet(), require('./routes/register-get'));
router.use('/register', isNotAuthenticatedPost(), require('./routes/register-post'));

router.use('/reset', isNotAuthenticatedGet(), require('./routes/reset-get'));
router.use('/reset', isNotAuthenticatedPost(), require('./routes/reset-post'));

router.use('/', isAuthenticatedGet(), require('./routes/index-get'));
router.use('/', isAuthenticatedPost(), require('./routes/index-post'));

module.exports = router;