var mongoose = require('./db');
var Schema = mongoose.Schema;

module.exports = {
    carRecord: new mongoose.Schema({
        carNumber: String,
        brandName: {type: Schema.Types.ObjectId, ref: 'brand'},
        model: String,
        year: {type: Schema.Types.Number, min: 1950, max: 2019},
        errorCodes: [{type: Schema.Types.ObjectId, ref: 'code'}],
        carDetails: String
    }),
    brand: new mongoose.Schema({
        brandName: { type: String, unique: true }
    }),
    code: new mongoose.Schema({
        code: { type : String, unique: true },
        error: String
    }),
    user: new mongoose.Schema({
        firstName: { type: String, trim: true },
        lastName: { type: String, trim: true },
        email: { type: String, lowercase: true, trim: true, unique: true },
        username: { type: String, minlength: 1, lowercase: true, trim: true, unique: true },
        password: { type: String, minlength: 1, trim: true }
    })
};