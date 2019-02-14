const uuid = require('uuid/v4');
var session = require('express-session');
var messages = require("./messages");

module.exports = {

    users_sessions:{},

    getNewSession: function(username) {
        let sid = uuid();
        this.users_sessions[sid] = {time: Date.now(), username: username};
        console.log(sid + " - " + username);
        return sid;
    },

    has: function(sid) {
        return sid in this.users_sessions;
    },

    verifySession: function(req) {
        if(req.session.sid !== undefined) {
            console.log(req.session.sid);
            if(this.has(req.session.sid)) {
                console.log("verified session");
                return true;
            }
        }
        return false;
    },

    removeSession: function(req) {
        if(this.verifySession(req)) {
            this.users_sessions[req.session.sid] = undefined;
            req.session.sid = undefined;
        }
    }
}
