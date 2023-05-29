/**
 * Custom HTTP Logger Middleware
 */

// Dependencies
import morgan, { StreamOptions } from 'morgan';
import Logger from '../utils/logger';

// Use Winston http log method for requests
const stream: StreamOptions = {
	write: (message) => Logger.http(message),
};

// Skip if in production
const skip = () => {
	const env = process.env.NODE_ENV || 'development';
	return env !== 'development';
};

// Build the morgan middleware
const morganMiddleware = morgan(
	':method :url :status :res[content-length] - :response-time ms',
	{ stream, skip }
);

export default morganMiddleware;
