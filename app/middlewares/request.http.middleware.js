import logger from '../helpers/logger.js';

export default (req, _, next) => {
  logger.http(`[${req.method}] ${req.url}`);
  next();
};
