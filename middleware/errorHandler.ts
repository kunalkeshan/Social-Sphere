/**
 * Error Middleware
 */

// Dependencies
import { ErrorRequestHandler } from 'express';
import { ApiError } from '../utils/apiError';
import { IS_PRODUCTION } from '../config';

/**
 *
 * @param err Error
 * @param req Request
 * @param res Response
 * @param next NextFunction
 * @returns void
 */
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
	!IS_PRODUCTION && console.log(err);
	if (err instanceof ApiError) {
		return res.status(err.statusCode).json({
			message: err.message,
			data: err.data,
			success: false,
		});
	}
	return res.status(500).json({
		message: 'Interval Server Error!',
		data: {},
		success: false,
	});
};

export default errorHandler;
