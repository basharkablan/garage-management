var mongoose = require('./db');
var Schema = mongoose.Schema;

module.exports = {
    carRecord: new mongoose.Schema({
        carNumber: { type: String, required: true },
        date: { type: Date, required: true },
        brandName: {type: Schema.Types.ObjectId, ref: 'brand', required: true},
        model: { type: String, required: true },
        year: {type: Schema.Types.Number, min: 1950, max: 2019, required: true},
        engine: String,
        errorCodes: [{type: Schema.Types.ObjectId, ref: 'code'}],
        complaint: { type: String, required: true },
        workDone: String,
        cost: {type: Schema.Types.Number, min: 0, required: true}
    }),
    brand: new mongoose.Schema({
        brandName: { type: String, unique: true, trim: true, required: true }
    }),
    code: new mongoose.Schema({
        code: { type : String, unique: true, required: true },
        error: { type: String, trim: true, required: true }
    }),
    user: new mongoose.Schema({
        firstName: { type: String, trim: true, required: true },
        lastName: { type: String, trim: true, required: true },
        email: { type: String, lowercase: true, trim: true, unique: true, required: true },
        username: { type: String, minlength: 1, lowercase: true, trim: true, unique: true, required: true },
        password: { type: String, minlength: 1, trim: true, required: true }
    })
};