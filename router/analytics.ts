/**
 * Analytics Router
 */

// Dependencies
import express, { NextFunction, Request, Response } from 'express';
import { zParse } from '../utils/zParse';
import { updateLinkCountSchema } from '../schema/analytics';
import { updateLinkCountController } from '../controller/analytics';

const Router = express.Router();

Router.post(
	'/update-count',
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const data = await zParse(updateLinkCountSchema, req);
			await updateLinkCountController(data);
			return res.status(204);
		} catch (error) {
			return next(error);
		}
	}
);

export default Router;
