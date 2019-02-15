var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
const uuid = require('uuid/v4');
var app = express();

const favicon = require('express-favicon');

global.__basedir = __dirname;

app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(favicon(__dirname + '/public/favicon.png'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
  secret: uuid(),
  resave: false,
  saveUninitialized: true,
  cookie: {}
}));

require('./db/init_db');

app.use('/', require("./router"));

var server = app.listen(3000, () => { console.log("Server is Listening on port 3000...")});