var mongoose = require('./db');

module.exports = {
    carRecord: new mongoose.Schema({
        carNumber: String,
        carDetails: String
    }),
    code: new mongoose.Schema({
        code: String,
        error: String
    }),
    user: new mongoose.Schema({
        firstName: String,
        lastName: String,
        email: String,
        username: String,
        password: String
    })
}