var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var config = require('./config/config');
var userlib = require('./lib/userlib');
var jwtAuth = require('./lib/jwtAuth');
var others = require('./routes/other')
var routes = require('./routes/index');
var auth = require('./routes/auth');
var helmet = require('helmet');
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('jwtSecret', config.secret);

app.use(helmet());
app.use(logger('dev'));
//Use body parser to get POST requests for API use
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('base', '/');

//Initialize passport
app.use(passport.initialize());

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));

app.all('/api/*', [bodyParser(), jwtAuth]);
//app.all('/auth/*', [bodyParser(), jwtAuth]);

require('./lib/passport')(passport);
app.use('/', others);
app.use('/api', routes);
app.use('/auth', auth);

mongoose.connect(config.url);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function () {
  console.log('connected');
});


app.get('/partials/:name', function (req, res) {
  res.render('partials/' + req.params.name);
});



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
