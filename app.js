var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
validator = require('express-validator');

var book = require('./routes/book');
var author = require('./routes/author');
var user = require('./routes/user');
var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'dist')));
app.use(validator());

// routes middleware
app.use('/user', user);
app.use('/book', book);
app.use('/author', author);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.errorMessage;
  res.locals.error = err;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).json({err: err});
});


var url = 'mongodb://localhost/mean-app';
var mlabUrl = 'mongodb://rizwan:jamal@ds155841.mlab.com:55841/book_library';

mongoose.Promise = global.Promise;
if(process.env.NODE_ENV == "production"){
  mongoose.connect(mlabUrl)
  .then(() =>  console.log('connection successful'))
  .catch((err) => console.error(err));

}else{
  mongoose.connect(url)
  .then(() =>  console.log('connection successful'))
  .catch((err) => console.error(err));
}

module.exports = app;