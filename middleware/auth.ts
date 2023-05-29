/**
 * Authentication Middleware Functions
 */

// Dependencies
import { RequestHandler } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET } from '../config';
import { ApiError } from '../utils/apiError';
import { collections } from '../services/database';
import { User } from '../@types';

// Default Unauthorized Message
const UNAUTHORIZED = {
	statusCode: 401,
	message: 'app/unauthorized-request',
	data: {},
	success: false,
};

interface UserAuthDecoded extends JwtPayload {
	id: string;
}

/**
 *
 * @param req Request
 * @param res Response
 * @param next NextFunction
 * @returns void
 */
export const auth: RequestHandler = async (req, res, next) => {
	try {
		const [name, token]: [string, string] | string[] =
			req.headers.authorization?.split(' ') || [];
		if (!token) throw new ApiError(UNAUTHORIZED);
		const decoded = jwt.verify(token, JWT_SECRET) as UserAuthDecoded;
		const user = (await collections.users.findOne({
			publicId: decoded.publicId,
		})) as User;
		if (!user) throw new ApiError(UNAUTHORIZED);
		res.locals.user = user;
		res.locals.auth = { name, token };
		return next();
	} catch (error) {
		return next(error);
	}
};
