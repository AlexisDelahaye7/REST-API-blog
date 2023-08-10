import postDataMapper from '../../models/post.datamapper.js';
import categoryDataMapper from '../../models/category.datamapper.js';

import { ApiError } from '../../middlewares/error.middleware.js';

export default {
  /**
   * Post controller to get all records.
   * ExpressMiddleware signature
   * @param {object} _ Express req.object (not used)
   * @param {object} res Express response object
   * @returns Route API JSON response
   */
  async getAll(_, res) {
    const posts = await postDataMapper.findAll();
    return res.json(posts);
  },

  /**
   * Post controller to get a record.
   * ExpressMiddleware signature
   * @param {object} req Express req.object (not used)
   * @param {object} res Express response object
   * @returns Route API JSON response
   */
  async getOne(req, res) {
    const post = await postDataMapper.findByPk(req.params.id);

    if (!post) {
      throw new ApiError('Post not found', { statusCode: 404 });
    }

    return res.json(post);
  },

  /**
   * Post controller to get a record.
   * ExpressMiddleware signature
   * @param {object} req Express req.object (not used)
   * @param {object} res Express response object
   * @returns Route API JSON response
   */
  async getByCategoryId(req, res) {
    // On veut d'abord vérifié que la category demandé existe
    const category = await categoryDataMapper.findByPk(req.params.id);
    if (!category) {
      throw new ApiError('Category not found', { statusCode: 404 });
    }

    const posts = await postDataMapper.findByCategoryId(req.params.id);
    return res.json(posts);
  },

  /**
   * Post controller to create a record.
   * ExpressMiddleware signature
   * @param {object} req Express req.object (not used)
   * @param {object} res Express response object
   * @returns Route API JSON response
   */
  async create(req, res) {
    const postBySlug = await postDataMapper.findBySlug(req.body.slug);
    if (postBySlug) {
      throw new ApiError('Post already exists with this slug', { statusCode: 400 });
    }
    const postByTitle = await postDataMapper.findByTitle(req.body.title);
    if (postByTitle) {
      throw new ApiError('Post already exists with this title', { statusCode: 400 });
    }

    const savedPost = await postDataMapper.insert(req.body);
    return res.json(savedPost);
  },

  /**
   * Post controller to update a record.
   * ExpressMiddleware signature
   * @param {object} req Express req.object (not used)
   * @param {object} res Express response object
   * @returns Route API JSON response
   */
  async update(req, res) {
    const post = await postDataMapper.findByPk(req.params.id);
    if (!post) {
      throw new ApiError('This post does not exists', { statusCode: 404 });
    }

    const postBySlug = await postDataMapper.findBySlug(req.body.slug, req.params.id);
    if (postBySlug) {
      throw new ApiError('Another post already exists with this slug', { statusCode: 400 });
    }
    const postByTitle = await postDataMapper.findByTitle(req.body.title, req.params.id);
    if (postByTitle) {
      throw new ApiError('Another post already exists with this title', { statusCode: 400 });
    }

    const savedPost = await postDataMapper.update(req.params.id, req.body);
    return res.json(savedPost);
  },

  /**
   * Post controller to delete a record.
   * ExpressMiddleware signature
   * @param {object} req Express req.object (not used)
   * @param {object} res Express response object
   * @returns Route API JSON response
   */
  async delete(req, res) {
    const post = await postDataMapper.findByPk(req.params.id);
    if (!post) {
      throw new ApiError('This post does not exists', { statusCode: 404 });
    }

    await postDataMapper.delete(req.params.id);
    return res.status(204).json();
  },
};
