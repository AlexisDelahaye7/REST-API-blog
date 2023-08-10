/**
 * Implémentation de l'exception ApiError.
 * @typedef {object} ApiError
 * @property {string} message - Error message
 * @property {string} name - Error name
 * @property {object} infos - Additionnal informations
 */
export default class ApiError extends Error {
  constructor(message, infos) {
    super(message);
    this.name = 'ApiError';
    this.infos = infos;
  }
}
