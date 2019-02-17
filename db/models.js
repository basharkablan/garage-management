var mongoose = require('./db');
var schemas = require('./schemas');

module.exports = {
    carRecord: mongoose.model('car-record', schemas.carRecord),
    brand: mongoose.model('brand', schemas.brand),
    code: mongoose.model('code', schemas.code),
    user: mongoose.model('user', schemas.user)
};