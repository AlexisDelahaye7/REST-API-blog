import express from 'express';

import validate from '../../validation/validator.middleware.js';
import createSchema from '../../validation/schemas/category.create.schema.js';
import updateSchema from '../../validation/schemas/category.update.schema.js';
import controllerHandler from '../../middlewares/controller.middleware.js';

import { categoryController as controller } from '../../controllers/api/api.controller.js';

const router = express.Router();

router
  .route('/')
  /**
   * GET /api/categories
   * @summary Get all categories
   * @tags Category
   * @return {[Category]} 200 - success response - application/json
   */
  .get(controllerHandler(controller.getAll))
  /**
   * POST /api/categories
   * @summary Create a category
   * @tags Category
   * @param {InputCategory} request.body.required - category info
   * @return {Category} 200 - success response - application/json
   * @return {ApiError} 400 - Bad request response - application/json
   * @return {ApiError} 404 - Category not found - application/json
   */
  .post(validate('body', createSchema), controllerHandler(controller.create));

router
  .route('/:id(\\d+)')
  /**
   * GET /api/categories/{id}
   * @summary Get one category
   * @tags Category
   * @param {number} id.path.required - category identifier
   * @return {Category} 200 - success response - application/json
   * @return {ApiError} 400 - Bad request response - application/json
   * @return {ApiError} 404 - Category not found - application/json
   */
  .get(controllerHandler(controller.getOne))
  /**
   * PATCH /api/categories/{id}
   * @summary Update one category
   * @tags Category
   * @param {number} id.path.required - category identifier
   * @param {InputCategory} request.body.required - category info
   * @return {Category} 200 - success response - application/json
   * @return {ApiError} 400 - Bad request response - application/json
   * @return {ApiError} 404 - Category not found - application/json
   */
  .patch(validate('body', updateSchema), controllerHandler(controller.update))
  /**
   * DELETE /api/categories/{id}
   * @summary Delete one category
   * @tags Category
   * @param {number} id.path.required - category identifier
   * @return {Category} 200 - success response - application/json
   * @return {ApiError} 400 - Bad request response - application/json
   * @return {ApiError} 404 - Category not found - application/json
   */
  .delete(controllerHandler(controller.delete));

export default router;
