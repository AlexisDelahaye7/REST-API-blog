import express from 'express';

import categoryRouter from './api.category.router.js';
import postRouter from './api.post.router.js';

import { ApiError } from '../../middlewares/error.middleware.js';

import { apiController } from '../../controllers/api/api.controller.js';

const router = express.Router();

router.all('/', apiController.home);

router.use('/categories', categoryRouter);

router.use('/posts', postRouter);

router.use(() => {
  throw new ApiError('API Route not found', { statusCode: 404 });
});

export default router;
