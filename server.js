var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use('/static', express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', require("./router"));

var server = app.listen(3000, () => { console.log("Server is Listening on port 3000...")});