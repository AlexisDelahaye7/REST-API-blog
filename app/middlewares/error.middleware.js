/* eslint-disable no-unused-vars */
/**
 * Gestionnaire d'erreur, sous forme de middleware,
 * appelé en cas de passage d'erreur à la function next()
 */
import logger from '../helpers/logger.js';

// relais
export { default as ApiError } from '../errors/api.error.js';

/**
 * Middleware that respond to a next method with an error as argument
 * @param {object} err Error class
 * @param {object} res Express response object
 */
export const errorHandler = (err, _, res, next) => {
  const { message } = err;
  let userMessage = message;
  let statusCode = err.infos?.statusCode;

  if (!statusCode || Number.isNaN(Number(statusCode))) {
    statusCode = 500;
  }

  if (statusCode === 500 && res.app.get('env') !== 'development') {
    userMessage = 'Internal Server Error';
  }

  if (statusCode === 500) {
    logger.error(userMessage, err);
  }

  if (res.get('Content-type')?.includes('html')) {
    res.status(statusCode).render('error', {
      statusCode,
      message: userMessage,
      title: `Error ${statusCode}`,
    });
  } else {
    res.status(statusCode).json({
      status: 'error',
      statusCode,
      message: userMessage,
    });
  }
};
