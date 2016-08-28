var express = require('express');
var path = require('path');

var app = express();

var routes = require('./routes/index');

app.set('view engine','jade');

app.use(express.static(path.join(__dirname,'public')));
app.use('/',routes);

module.exports = app;