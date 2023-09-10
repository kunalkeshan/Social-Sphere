/**
 * Link Controller
 */

// Dependencies
import { ObjectId } from 'mongodb';
import {
	CreateLinkSchema,
	DeleteLinkSchema,
	EditLinkSchema,
} from '../schema/link';
import { collections } from '../services/database';
import { ApiError } from '../utils/apiError';
import { Link, User } from '../@types';

/**
 *
 * @param user User
 * @returns Links
 * @method GET
 * @route /api/link
 */
export const fetchUserLinksController = async (user: User) => {
	const links = (await collections.links
		.find({ userId: user.publicId })
		.toArray()) as Link[];
	return { links };
};

/**
 *
 * @param data CreateLinkSchema
 * @param user User
 * @returns Link
 * @method POST
 * @route /api/link
 */
export const createLinkController = async (
	data: CreateLinkSchema,
	user: User
) => {
	const link = { ...data.body, userId: user.publicId } as Link;
	const result = await collections.links.insertOne(link);
	if (result) {
		await collections.analytics.insertOne({
			linkId: result.insertedId,
			clickCount: 0,
			clickedAt: [],
		});
		link.id = result.insertedId;
		return { link };
	} else {
		throw new ApiError({
			statusCode: 500,
			message: 'link/unable-to-create-new-link',
		});
	}
};

/**
 *
 * @param data EditLinkSchema
 * @returns Promise<void>
 * @method PUT
 * @route /api/link
 */
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

/**
 *
 * @param data DeleteLinkSchema
 * @returns Promise<void>
 * @method DELETE
 * @route /api/link
 */
export const deleteLinkController = async (data: DeleteLinkSchema) => {
	const count = await collections.links.countDocuments({
		_id: new ObjectId(data.body.id),
	});
	if (count === 0)
		throw new ApiError({
			message: 'link/link-does-not-exist',
			statusCode: 404,
		});
	const response = await collections.links.deleteOne({
		_id: new ObjectId(data.body.id),
	});
	if (response) {
		await collections.analytics.deleteOne({
			linkId: new ObjectId(data.body.id),
		});
		return Promise.resolve();
	} else {
		throw new ApiError({
			message: 'user/unable-to-delete-link',
			statusCode: 500,
		});
	}
};
