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
        firstName: { type: String, trim: true },
        lastName: { type: String, trim: true },
        email: { type: String, lowercase: true, trim: true },
        username: { type: String, minlength: 1, lowercase: true, trim: true },
        password: { type: String, minlength: 1, trim: true }
    })
}