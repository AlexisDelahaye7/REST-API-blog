import { createServer } from 'http';
import logger from './app/helpers/logger.js';
// C'est très import : l'import des variables d'environnement doit se faire AVANT l'import de l'app
import './app/helpers/env.load.js';
import app from './app/app.js';

const PORT = process.env.PORT ?? 3000;

const server = createServer(app);

server.listen(PORT, () => {
  logger.debug(`Listening on ${PORT}`);
});
