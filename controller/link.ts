/**
 * Link Controller
 */

// Dependencies
import { ObjectId } from 'mongodb';
import Link from '../models/link';
import User from '../models/user';
import { CreateLinkSchema, EditLinkSchema } from '../schema/link';
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

export const editLinkController = async (data: EditLinkSchema) => {
	const count = await collections.links.countDocuments({
		_id: new ObjectId(data.body.id),
	});
	if (count === 0)
		throw new ApiError({
			message: 'link/link-does-not-exist',
			statusCode: 404,
		});
	const response = await collections.links.updateOne(
		{ _id: new ObjectId(data.body.id) },
		{ $set: { [data.body.key]: data.body.value } },
		{ upsert: true }
	);
	if (response) {
		return Promise.resolve();
	} else {
		throw new ApiError({
			message: 'user/unable-to-update-link',
			statusCode: 500,
		});
	}
};
