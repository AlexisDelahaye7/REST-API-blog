import express from 'express';
import controllerHandler from '../../middlewares/controller.middleware.js';

import websiteController from '../../controllers/website/website.controller.js';
import { ApiError } from '../../middlewares/error.middleware.js';

const router = express.Router();

router.use((_, res, next) => {
  res.type('html');
  next();
});

router.get('/', controllerHandler(websiteController.home));

router.use(() => {
  throw new ApiError('Page introuvable', { statusCode: 404 });
});

export default router;
