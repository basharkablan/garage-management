const uuid = require('uuid/v4');
var session = require('express-session');

module.exports = {

    reset_sessions:{},

    getNewSession: function(req, email) {
        let sid = uuid();
        this.reset_sessions[sid] = {time: Date.now(), email: email};
        req.session.reset_sid = sid;
        return sid;
    },

    has: function(sid) {
        return sid in this.reset_sessions;
    },

    verifySession: function(req, email) {
        if(req.session.reset_sid !== undefined)
            if(this.has(req.session.reset_sid))
                if(this.reset_sessions[req.session.reset_sid].email == email)
                    return true;
        return false;
    },

    removeSession: function(req) {
        this.reset_sessions[req.session.reset_sid] = undefined;
        req.session.reset_sid = undefined;
    }
}
