import * as url from 'url';
import expressJSDocSwagger from 'express-jsdoc-swagger';

const dirname = url.fileURLToPath(new URL('.', import.meta.url));

const options = {
  info: {
    version: '1.0.0',
    title: "O'blog",
    description: "Blog de l'école O'clock",
  },
  baseDir: dirname,
  filesPattern: ['../routers/**/*.js', '../errors/*.js', '../models/*.js'],
  swaggerUIPath: process.env.API_DOCUMENTATION_ROUTE || '/api/docs',
  exposeApiDocs: true,
  apiDocsPath: '/api/docs',
};

/**
 * Swagger middleware factory
 * @param {object} app Express application
 * @returns Express JSDoc Swagger middleware that create web documentation
 */
export default (app) => expressJSDocSwagger(app)(options);
