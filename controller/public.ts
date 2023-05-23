/**
 * Public Controller
 */

import { User, Link } from '../@types';
import { UserProfileSchema } from '../schema/public';
import { collections } from '../services/database';
import { ApiError } from '../utils/apiError';

// Dependencies

export const userProfileController = async (data: UserProfileSchema) => {
	const user = (await collections.users.findOne({
		username: data.params.username,
	})) as User;
	if (!user)
		throw new ApiError({
			message: 'user/account-does-not-exists',
			statusCode: 404,
		});
	const links = (await collections.links
		.find({ userId: user.publicId })
		.toArray()) as Link[];
	delete user.password;
	delete user.id;
	delete user._id;
	return { user, links };
};
