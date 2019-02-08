const uuid = require('uuid/v4');
var messages = require("./messages")

module.exports = {

    users_sessions:{},

    getNewSession: function(username) {
        let sid = uuid();
        this.users_sessions[sid] = {time: Date.now(), username: username};
        console.log(this.users_sessions[sid]);
        console.log(sid + " - " + username);
        return sid;
    },

    has: function(sid) {
        return sid in this.users_sessions;
    },

    verifySession: function(req) {
        if(req.body.sid !== undefined)
            if(this.has(req.body.sid))
                return true;
        return false;
    },

    removeSession: function(req) {
        if(this.verifySession(req))
            this.users_sessions[req.body.sid] = undefined;
    }
}
