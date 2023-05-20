/**
 * User Controller
 */

// Dependencies
import { collections } from '../services/database';
import User from '../models/user';
import { uuid } from 'uuidv4';
import bcrypt from 'bcryptjs';
import { ApiError } from '../utils/apiError';
import { UserIsUniqueSchema, NewUserAccountSchema } from '../schema/user';

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
	console.log(count);
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
		return { user };
	} else {
		throw new ApiError({
			statusCode: 500,
			message: 'user/unable-to-create-new-user',
		});
	}
};
