require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');

var app = express();

// view engine setup

app.use(logger('dev'));
app.use(express.json());

var indexRouter = require('./routes/index');
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler returning JSON
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  });
});

module.exports = app;
