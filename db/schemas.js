var mongoose = require('./db');

module.exports = {
    carRecord: new mongoose.Schema({
        carNumber: String,
        carDetails: String
    }),
    code: new mongoose.Schema({
        code: String,
        error: String
    })
}