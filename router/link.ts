/**
 * Link Router
 */

// Dependencies
import express, { NextFunction, Request, Response } from 'express';
import { auth } from '../middleware/auth';
import { createLinkSchema } from '../schema/link';
import { zParse } from '../utils/zParse';
import { createLinkController } from '../controller/link';
const Router = express.Router();

Router.post(
	'/',
	auth,
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const data = await zParse(createLinkSchema, req);
			const { link } = await createLinkController(data, res.locals.user);
			return res
				.status(201)
				.json({ link, message: 'link/new-link-created' });
		} catch (error) {
			return next(error);
		}
	}
);

export default Router;
