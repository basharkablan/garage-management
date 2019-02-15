var mongoose = require('./db');
var schemas = require('./schemas');

module.exports = {
    carRecord: mongoose.model('carRecords', schemas.carRecord),
    brand: mongoose.model('brand', schemas.brand),
    code: mongoose.model('codes', schemas.code),
    user: mongoose.model('users', schemas.user)
};