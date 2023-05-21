/**
 * Link Router
 */

// Dependencies
import express, { NextFunction, Request, Response } from 'express';
import { auth } from '../middleware/auth';
import {
	createLinkSchema,
	deleteLinkSchema,
	editLinkSchema,
} from '../schema/link';
import { zParse } from '../utils/zParse';
import {
	createLinkController,
	deleteLinkController,
	editLinkController,
	fetchUserLinksController,
} from '../controller/link';
const Router = express.Router();

Router.get(
	'/',
	auth,
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { links } = await fetchUserLinksController(res.locals.user);
			return res.json({ links, message: 'link/user-links-fetched' });
		} catch (error) {
			return next(error);
		}
	}
);

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

Router.put(
	'/',
	auth,
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const data = await zParse(editLinkSchema, req);
			await editLinkController(data);
			return res.json({ message: 'link/link-updated' });
		} catch (error) {
			return next(error);
		}
	}
);

Router.delete(
	'/',
	auth,
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const data = await zParse(deleteLinkSchema, req);
			await deleteLinkController(data);
			return res.json({ message: 'link/link-deleted' });
		} catch (error) {
			return next(error);
		}
	}
);

export default Router;
