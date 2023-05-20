/**
 * User Request Schema
 */

// Dependencies
import { z } from 'zod';

export const userIsUniqueSchema = z.object({
	query: z.object({
		key: z.union([z.literal('email'), z.literal('username')]),
		value: z.string(),
	}),
});
