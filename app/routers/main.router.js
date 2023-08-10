import express from 'express';

import apiRouter from './api/api.router.js';
import websiteRouter from './website/website.router.js';

import { errorHandler } from '../middlewares/error.middleware.js';

const router = express.Router();

router.use('/api', apiRouter);
router.use('/', websiteRouter);

router.use(errorHandler);

export default router;
