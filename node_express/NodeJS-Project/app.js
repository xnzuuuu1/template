
import HttpErrorCodes from './inclusions/httpErrorCodes.js';
import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();

let indexRouter, usersRouter;
const INDEX_NAME = process.env.INDEX_NAME;
const USERS_NAME = process.env.USERS_NAME;
const INDEX_FILE_PATH = process.env.INDEX_FILE_PATH.replace('${INDEX_NAME}', INDEX_NAME);
const USERS_FILE_PATH = process.env.USERS_FILE_PATH.replace('${USERS_NAME}', USERS_NAME);
const INDEX_API_PATH = process.env.INDEX_API_PATH;
const USERS_API_PATH = process.env.USERS_API_PATH.replace('${USERS_NAME}', USERS_NAME);

// Dynamic import for routers
const importRouters = async () => {
  indexRouter = (await import(INDEX_FILE_PATH)).default;
  usersRouter = (await import(USERS_FILE_PATH)).default;
};
await importRouters();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

// Set view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Serve static files efficiently
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: '1d',
  etag: true
}));

// Routes
app.use(INDEX_API_PATH, indexRouter);
app.use(USERS_API_PATH, usersRouter);

// 404 handler
app.use((req, res, next) => {
  next(createError(HttpErrorCodes.NOT_FOUND, 'Resource not found'));
});

// Error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || HttpErrorCodes.INTERNAL_SERVER_ERROR);
  res.render('error');
});

export default app;
