var mongoose = require('./db');
var schemas = require('./schemas');

module.exports = {
    carRecords: mongoose.model('carRecords', schemas.carRecord),
    codes: mongoose.model('codes', schemas.code)
}