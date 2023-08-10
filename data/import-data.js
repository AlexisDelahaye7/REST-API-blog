import { readFile } from 'fs/promises';

import '../app/helpers/env.load.js';
import pg from 'pg';
import logger from '../app/helpers/logger.js';

const categories = JSON.parse(
  await readFile(
    new URL('./categories.json', import.meta.url),
  ),
);
const posts = JSON.parse(
  await readFile(
    new URL('./posts.json', import.meta.url),
  ),
);

const { Client } = pg;
const client = new Client();
await client.connect();

logger.debug('Client connected');

logger.debug('Clean table');

await client.query('TRUNCATE TABLE category, post RESTART IDENTITY');

const categoryQueries = [];

categories.forEach((category) => {
  logger.debug(`Processing category: ${category.label}`);
  const query = client.query(
    `
        INSERT INTO "category"
        ("label", "route")
        VALUES
        ($1, $2)
        RETURNING *
      `,
    [category.label, category.route],
  );
  categoryQueries.push(query);
});

const results = await Promise.all(categoryQueries);

const categoryRows = results.map((result) => result.rows[0]);

const postQueries = [];
posts.forEach((post) => {
  logger.debug(`Processing post: ${post.slug}`);

  const postCategory = categoryRows.find((category) => category.label === post.category);

  const insertPostQuery = {
    text: `
        INSERT INTO "post"
        ("slug", "title", "excerpt", "content", "category_id")
        VALUES
        ($1, $2, $3, $4, $5)
      `,
    values: [
      post.slug,
      post.title,
      post.excerpt,
      post.content,
      postCategory.id,
    ],
  };

  const query = client.query(insertPostQuery);
  postQueries.push(query);
});

await Promise.all(postQueries);

logger.debug('Done');

client.end();
