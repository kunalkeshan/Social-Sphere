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

export const loginUserSchema = z.object({
	body: z.object({
		username: z.string(),
		password: z.string(),
	}),
});

export type LoginUserSchema = z.infer<typeof loginUserSchema>;

export const userProfileTitleSchema = z.object({
	body: z.object({
		title: z.string().max(30),
	}),
});

export type UserProfileTitleSchema = z.infer<typeof userProfileTitleSchema>;

export const userProfileBioSchema = z.object({
	body: z.object({
		bio: z.string().max(80),
	}),
});

export type UserProfileBioSchema = z.infer<typeof userProfileBioSchema>;
