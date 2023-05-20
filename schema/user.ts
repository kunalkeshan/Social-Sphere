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

export type UserIsUniqueSchema = z.infer<typeof userIsUniqueSchema>;

export const newUserAccountSchema = z.object({
	body: z.object({
		fullName: z.string(),
		email: z.string().email(),
		username: z.string(),
		password: z.string(),
	}),
});

export type NewUserAccountSchema = z.infer<typeof newUserAccountSchema>;
