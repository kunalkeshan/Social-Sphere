/**
 * User Router
 */

// Dependencies
import express, { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { zParse } from '../utils/zParse';
import { newUserAccountSchema, userIsUniqueSchema } from '../schema/user';
import {
	newUserAccountController,
	userIsUniqueController,
} from '../controller/user';
import { JWT_SECRET } from '../config';
const Router = express.Router();

Router.post(
	'/is-unique',
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const data = await zParse(userIsUniqueSchema, req);
			const { isUnique } = await userIsUniqueController(data);
			return res.json({ isUnique });
		} catch (error) {
			return next(error);
		}
	}
);

Router.post('/', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const data = await zParse(newUserAccountSchema, req);
		const { user } = await newUserAccountController(data);
		const token = jwt.sign({ publicId: user.publicId }, JWT_SECRET, {
			expiresIn: '365d',
		});
		return res.json({ user, token });
	} catch (error) {
		return next(error);
	}
});

export default Router;
