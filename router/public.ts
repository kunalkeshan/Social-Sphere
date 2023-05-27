/**
 * Public Router
 */

// Dependencies
import express, { NextFunction, Request, Response } from 'express';
import { userProfileSchema } from '../schema/public';
import { zParse } from '../utils/zParse';
import { userProfileController } from '../controller/public';
const Router = express.Router();

Router.get(
	'/user/:username',
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const data = await zParse(userProfileSchema, req);
			const { links, user } = await userProfileController(data);
			return res.json({ links, user, message: 'user/profile-fetched' });
		} catch (error) {
			return next(error);
		}
	}
);

export default Router;
