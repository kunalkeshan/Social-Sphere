/**
 * User Controller
 */

// Dependencies
import { collections } from '../services/database';
import User from '../models/user';
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
} from '../schema/user';

export const userIsUniqueController = async (data: UserIsUniqueSchema) => {
	const query = { [data.query.key]: data.query.value };
	const count = await collections.users.countDocuments(query);
	return {
		isUnique: count === 0,
	};
};

export const newUserAccountController = async (data: NewUserAccountSchema) => {
	const count = await collections.users.countDocuments({
		$or: [{ email: data.body.email, username: data.body.username }],
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
