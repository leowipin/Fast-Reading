import 'dotenv/config';
import createError from 'http-errors';
import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan'
import fs from 'fs';
import path from 'path';
import logger from './logger.js';
import { fileURLToPath } from 'url';

var app = express();

// connection to the database
import connectDB from './db.js';

connectDB();

// Configurar formato basado en el entorno (production o desarrollo)
const logFormat = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';

// Para obtener __dirname en ES modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Ruta al archivo de log
const logFilePath = path.join(__dirname, 'requests.log');

// Verificar y crear el archivo y directorio si no existen
const logDir = path.dirname(logFilePath);
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

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
import indexRouter from './routes/index.js';
import userRouter from './routes/user.js';
import roleRouter from './routes/role.js';


app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/role', roleRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler returning JSON
app.use(function(err: any, req: Request, res: Response, next: NextFunction)  {
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

export default app;