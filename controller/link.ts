/**
 * Link Controller
 */

// Dependencies
import Link from '../models/link';
import User from '../models/user';
import { CreateLinkSchema } from '../schema/link';
import { collections } from '../services/database';
import { ApiError } from '../utils/apiError';

export const fetchUserLinksController = async (user: User) => {
	const links = (await collections.links
		.find({ userId: user.publicId })
		.toArray()) as Link[];
	return { links };
};

export const createLinkController = async (
	data: CreateLinkSchema,
	user: User
) => {
	const link = { ...data.body, userId: user.publicId } as Link;
	const result = await collections.links.insertOne(link);
	if (result) {
		link.id = result.insertedId;
		return { link };
	} else {
		throw new ApiError({
			statusCode: 500,
			message: 'link/unable-to-create-new-link',
		});
	}
};
