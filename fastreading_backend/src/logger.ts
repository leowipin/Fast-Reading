import { createLogger, format, transports } from 'winston';
import stackTrace from 'stack-trace';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logger = createLogger({
    level: 'error', // Registra solo mensajes con nivel de severidad 'error' o superior.
    format: format.combine(
      format.timestamp(), // Añade una marca de tiempo a cada mensaje de log.
      format.printf((info) => { // Personaliza el formato de salida.
        const trace = stackTrace.parse(new Error()); // Analiza el stack trace de un error.
        const relevantFrame = trace[1]; // Selecciona el marco (frame) relevante del stack trace.
        const fileDetails = relevantFrame ? ` at ${relevantFrame.getFileName()}:${relevantFrame.getLineNumber()}` : '';
        return `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}${fileDetails}`; // Devuelve el mensaje de log con detalles.
      })
    ),
    transports: [
      new transports.File({ filename: path.join(__dirname, 'errors.log') })
    ]
  });
  

export default logger;
