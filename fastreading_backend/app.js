require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const logger = require('./logger');

var app = express();

// connection to the database
const connectDB = require('./db');

connectDB();

// Configurar formato basado en el entorno (production o desarrollo)
const logFormat = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';

// Si está en producción, escribe en el archivo requests.log
if (process.env.NODE_ENV === 'production') {
  const logStream = fs.createWriteStream(path.join(__dirname, 'requests.log'), { flags: 'a' });
  app.use(morgan(logFormat, { stream: logStream }));
} else {
  // Si no está en producción (en desarrollo, por ejemplo), solo muestra por consola
  app.use(morgan(logFormat));
}

app.use(express.json());

// routes
var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var roleRouter = require('./routes/role');

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/role', roleRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler returning JSON
app.use(function(err, req, res, next) {
  logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}\n${err.stack}`);

  if (req.app.get('env') === 'development') {
    console.error(err.stack);
  }

  res.status(err.status || 500);
  if (err.status === 404) {
    res.json({
      message: "No existe la ruta especificada"
    });
  } else {
    res.json({
      message: "Se produjo un error inesperado, intente nuevamente más tarde"
    });
  }
});

module.exports = app;
