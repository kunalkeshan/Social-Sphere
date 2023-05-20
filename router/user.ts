/**
 * User Router
 */

// Dependencies
import express, { NextFunction, Request, Response } from 'express';
const Router = express.Router();
import { zParse } from '../utils/zParse';
import { userIsUniqueSchema } from '../schema/user';
import { userIsUniqueController } from '../controller/user';

Router.post(
	'/is-unique',
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { query } = await zParse(userIsUniqueSchema, req);
			const { isUnique } = await userIsUniqueController(
				query.key,
				query.value
			);
			return res.json({ isUnique });
		} catch (error) {
			return next(error);
		}
	}
);

export default Router;
