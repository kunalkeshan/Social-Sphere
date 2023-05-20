/**
 * User Controller
 */

// Dependencies
import { collections } from '../services/database';

export const userIsUniqueController = async (
	key: 'username' | 'email',
	value: string
) => {
	const query = { [key]: value };
	const count = await collections.users.countDocuments(query);
	return {
		isUnique: count === 0,
	};
};
