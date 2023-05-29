/**
 * User Controller
 */

// Dependencies
import { collections } from '../services/database';
import { uuid } from 'uuidv4';
import bcrypt from 'bcryptjs';
import { ApiError } from '../utils/apiError';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';
import {
	UserIsUniqueSchema,
	NewUserAccountSchema,
	LoginUserSchema,
	UserProfileTitleSchema,
	UserProfileBioSchema,
	UserSocialsSchema,
} from '../schema/user';
import { User } from '../@types';

/**
 * @description Checks if a user is unique or not.
 * @param data UserIsUniqueSchema
 * @returns Promise<{isUnique}>
 * @method POST
 * @route /api/user/is-unique
 */
export const userIsUniqueController = async (data: UserIsUniqueSchema) => {
	const query = { [data.query.key]: data.query.value };
	const count = await collections.users.countDocuments(query);
	return {
		isUnique: count === 0,
	};
};

/**
 * @description Create a new user account with their fullName, username, email & password.
 * @param data NewUserAccountSchema
 * @returns Promise<{user, token}>
 * @method POST
 * @route /api/user/
 */
export const newUserAccountController = async (data: NewUserAccountSchema) => {
	const count = await collections.users.countDocuments({
		$or: [
			{
				email: { $eq: data.body.email },
			},
			{
				username: { $eq: data.body.username },
			},
		],
	});
	if (count !== 0)
		throw new ApiError({
			statusCode: 409,
			message: 'user/account-already-exists',
		});
	const salt = await bcrypt.genSalt();
	const hashedPassword = await bcrypt.hash(data.body.password, salt);
	const publicId = uuid();
	const avatar = `https://api.dicebear.com/6.x/thumbs/svg?seed=${publicId}`;
	const user = {
		...data.body,
		password: hashedPassword,
		publicId,
		avatar,
	} as User;
	const result = await collections.users.insertOne(user);
	if (result) {
		delete user.password;
		delete user.id;
		delete user._id;
		const token = jwt.sign({ publicId: user.publicId }, JWT_SECRET, {
			expiresIn: '365d',
		});
		return { user, token };
	} else {
		throw new ApiError({
			statusCode: 500,
			message: 'user/unable-to-create-new-user',
		});
	}
};

/**
 * @description Login user with username and password.
 * @param data LoginUserSchema
 * @returns Promise<{user, token}>
 * @method POST
 * @route /api/user/login
 */
export const loginUserController = async (data: LoginUserSchema) => {
	const user = (await collections.users.findOne({
		username: data.body.username,
	})) as User;
	if (!user)
		throw new ApiError({
			statusCode: 404,
			message: 'user/account-does-not-exists',
		});
	const isValidPassword = await bcrypt.compare(
		data.body.password,
		user.password
	);
	if (isValidPassword) {
		delete user.password;
		delete user.id;
		delete user._id;
		const token = jwt.sign({ publicId: user.publicId }, JWT_SECRET, {
			expiresIn: '365d',
		});
		return { user, token };
	} else {
		throw new ApiError({
			statusCode: 401,
			message: 'user/incorrect-password',
		});
	}
};

/**
 * @description Update user's profile titile.
 * @param data UserProfileTitleSchema
 * @param user User
 * @returns Promise<void>
 * @method POST
 * @route /api/profile/title
 */
export const userProfileTitleController = async (
	data: UserProfileTitleSchema,
	user: User
) => {
	const response = await collections.users.updateOne(
		{ publicId: user.publicId },
		{ $set: { title: data.body.title } },
		{ upsert: true }
	);
	if (response) {
		return Promise.resolve();
	} else {
		throw new ApiError({
			message: 'user/unable-to-update-title',
			statusCode: 500,
		});
	}
};

/**
 * @description Update user's profile bio.
 * @param data UserProfileBioSchema
 * @param user User
 * @returns Promise<void>
 * @method POST
 * @route /api/profile/bio
 */
export const userProfileBioController = async (
	data: UserProfileBioSchema,
	user: User
) => {
	const response = await collections.users.updateOne(
		{ publicId: user.publicId },
		{ $set: { bio: data.body.bio } },
		{ upsert: true }
	);
	if (response) {
		return Promise.resolve();
	} else {
		throw new ApiError({
			message: 'user/unable-to-update-bio',
			statusCode: 500,
		});
	}
};

/**
 * @description Update a social link for the user based on the
 * key provided in the request body.
 * @param data UserSocialsSchema
 * @param user User
 * @returns Promise<void>
 * @method POST
 * @route /api/profile/socials
 */
export const userSocialsController = async (
	data: UserSocialsSchema,
	user: User
) => {
	const response = await collections.users.updateOne(
		{ publicId: user.publicId },
		{ $set: { [`socials.${data.body.key}`]: data.body.value } },
		{ upsert: true }
	);
	if (response) {
		return Promise.resolve();
	} else {
		throw new ApiError({
			message: `user/unable-to-update-social}`,
			statusCode: 500,
		});
	}
};
