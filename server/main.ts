import 'source-map-support/register';

import * as bodyParser from 'body-parser';
import * as timeout from 'connect-timeout';
import * as express from 'express';
import * as logger from 'morgan';

import * as db from './db';
import { allowCors } from './middlewares/allowCors';
import { bindUser } from './middlewares/bindUser';
import { notFound } from './middlewares/errors';
import * as errors from './middlewares/errors';
import { saveHostname } from './middlewares/saveHostname';
import { router as apiRoutes } from './routes';
import * as settings from './settings';

db.connect();

const publicDir = __dirname + '/../dist';
const app = express();

if (settings.isProduction) {
  app.use(timeout('5s'));
}

app.use(express.static(publicDir));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(allowCors);
app.use(bindUser);
app.use(saveHostname);

if (settings.isDevelopment) {
  app.use(logger('dev'));
}

app.use('/api', apiRoutes);
app.get('/views/*', notFound);
app.get('*', (req, res) => res.sendFile('index.html', { root: publicDir }));

app.use(errors.notFound);
app.use(errors.parser);

if (settings.isDevelopment) {
  app.use(errors.developmentError);
} else {
  app.use(errors.productionError);
}

console.log(`starting server: PORT: ${settings.port} | ENV: ${settings.env}`);
app.listen(settings.port, () => console.log(`server started: PORT: ${settings.port} | ENV: ${settings.env}`));
process.on('unhandledRejection', (reason: any, p: any) => { /* ignore */ });