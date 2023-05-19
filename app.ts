/**
 * Server Entry
 */

import express from 'express';
import logger from 'morgan';
import { IS_PRODUCTION, PORT } from './config';
import path from 'path';

const app = express();

app.use(logger(IS_PRODUCTION ? 'combined' : 'dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
	console.log(`Server running at port: ${PORT}`);
});
