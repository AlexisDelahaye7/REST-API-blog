import pg from 'pg';

import logger from '../helpers/logger.js';

const { Pool } = pg;

const pool = new Pool();

export default {
  originalClient: pool,

  async query(...params) {
    logger.debug(params);
    return this.originalClient.query(...params);
  },
};
