var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/obd2_codes', { useNewUrlParser: true });

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'mongoose connection error:'));

db.once('open', () => {
  // we're connected!
  console.log("Database connection established");
});

module.exports = mongoose;