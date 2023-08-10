import logger from '../helpers/logger.js';
import { ApiError } from '../middlewares/error.middleware.js';

/**
 * Générateur de middleware pour la validation
 * d'un objet d'un des propriété de la requête
 * @param {string} prop - Nom de la propriété de l'objet request à valider
 * @param {Joi.object} schema - Le schema de validation du module Joi
 * @returns
 * Renvoi un middleware pour express qui valide
 * le corp de la requête en utilisant le schema passé en paramètre.
 * Renvoi une erreur 400 si la validation échoue.
 */
export default (prop, schema) => async (request, _, next) => {
  try {
    logger.debug(request[prop]);
    await schema.validateAsync(request[prop]);
    next();
  } catch (error) {
    next(new ApiError(error.details[0].message, { statusCode: 400 }));
  }
};
