/**
 * Server Entry
 */

// Dependencies
import express from 'express';
import logger from './middleware/morgan';
import path from 'path';
import { PORT } from './config';
import { connectToDatabase } from './services/database';
import errorHandler from './middleware/errorHandler';
import { ApiError } from './utils/apiError';
import appRouter from './router';
import cors from 'cors';

// Initializing Ap
const app = express();

// Setting up Middleware
app.use(cors());
app.use(logger);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Health Check Endpoint
app.get('/ping', (req, res) => res.send('pong'));

// Application Router
app.use(appRouter);

// Handle 404 Error
app.use((req, res, next) => {
	const error = new ApiError({
		message: `The request: ${req.originalUrl} does not exist in this server!`,
		statusCode: 404,
	});
	return next(error);
});

// Handle App Error
app.use(errorHandler);

// Connect to database and start server
connectToDatabase()
	.then(() => {
		app.listen(PORT, () => {
			console.log(
				`Server running at port: ${PORT}. Connect at http://localhost:${PORT}.`
			);
		});
	})
	.catch((error: Error) => {
		console.error('Database connection failed', error);
		process.exit();
	});
