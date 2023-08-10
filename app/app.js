import path from 'path';
import * as url from 'url';
import express from 'express';
import cors from 'cors';

import router from './routers/main.router.js';
import apiDocs from './helpers/api.doc.js';
import accessHttpMiddleware from './middlewares/request.http.middleware.js';

const dirname = url.fileURLToPath(new URL('.', import.meta.url));

const app = express();

app.set('views', path.join(dirname, 'views'));
app.set('view engine', 'pug');

app.use(accessHttpMiddleware);

apiDocs(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors(process.env.CORS_DOMAINS ?? 'locahost'));

app.use(router);

export default app;
