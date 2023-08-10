import categoryDataMapper from '../../models/category.datamapper.js';

import { ApiError } from '../../middlewares/error.middleware.js';

export default {
  /**
   * Category controller to get all records.
   * ExpressMiddleware signature
   * @param {object} _ Express request object (not used)
   * @param {object} res Express response object
   * @returns Route API JSON response
   */
  async getAll(_, res) {
    const categories = await categoryDataMapper.findAll();
    return res.json(categories);
  },

  /**
   * Category controller to get a record.
   * ExpressMiddleware signature
   * @param {object} req Express request object (not used)
   * @param {object} res Express response object
   * @returns Route API JSON response
   */
  async getOne(req, res) {
    const category = await categoryDataMapper.findByPk(req.params.id);

    if (!category) {
      throw new ApiError('Category not found', { statusCode: 404 });
    }

    return res.json(category);
  },

  /**
   * Category controller to create a record.
   * ExpressMiddleware signature
   * @param {object} req Express request object (not used)
   * @param {object} res Express response object
   * @returns Route API JSON response
   */
  async create(req, res) {
    const categoryByLabel = await categoryDataMapper.findByLabel(req.body.label);
    if (categoryByLabel) {
      throw new ApiError('Category already exists with this label', { statusCode: 400 });
    }
    const categoryByRoute = await categoryDataMapper.findByRoute(req.body.route);
    if (categoryByRoute) {
      throw new ApiError('Category already exists with this route', { statusCode: 400 });
    }

    const savedCategory = await categoryDataMapper.insert(req.body);
    return res.json(savedCategory);
  },

  /**
   * Category controller to update a record.
   * ExpressMiddleware signature
   * @param {object} req Express request object (not used)
   * @param {object} res Express response object
   * @returns Route API JSON response
   */
  async update(req, res) {
    const category = await categoryDataMapper.findByPk(req.params.id);
    if (!category) {
      throw new ApiError('This category does not exists', { statusCode: 404 });
    }

    const categoryByLabel = await categoryDataMapper.findByLabel(req.body.label, req.params.id);
    if (categoryByLabel) {
      throw new ApiError('Another category already exists with this label', { statusCode: 400 });
    }

    const categoryByRoute = await categoryDataMapper.findByRoute(req.body.route, req.params.id);
    if (categoryByRoute) {
      throw new ApiError('Another category already exists with this route', { statusCode: 400 });
    }

    /**
     * autre solution pour modifier une catégorie
    const categoryToSave = { ...category, ...req.body };
    const savedCategory = await categoryDataMapper.update(categoryToSave);
     */

    const savedCategory = await categoryDataMapper.update(req.params.id, req.body);
    return res.json(savedCategory);
  },

  /**
   * Category controller to delete a record.
   * ExpressMiddleware signature
   * @param {object} req Express request object (not used)
   * @param {object} res Express response object
   * @returns Route API JSON response
   */
  async delete(req, res) {
    const category = await categoryDataMapper.findByPk(req.params.id);
    if (!category) {
      throw new ApiError('This category does not exists', { statusCode: 404 });
    }

    await categoryDataMapper.delete(req.params.id);
    return res.status(204).json();
  },
};
