/**
 * User Request Schema
 */

// Dependencies
import { z } from 'zod';

export const userIsUniqueSchema = z.object({
	query: z.object({
		key: z.union([z.literal('email'), z.literal('username')]),
		value: z.string().trim(),
	}),
});

export type UserIsUniqueSchema = z.infer<typeof userIsUniqueSchema>;

export const newUserAccountSchema = z.object({
	body: z.object({
		fullName: z.string().trim(),
		email: z.string().email().trim(),
		username: z.string().trim(),
		password: z.string().trim(),
	}),
});

export type NewUserAccountSchema = z.infer<typeof newUserAccountSchema>;

export const loginUserSchema = z.object({
	body: z.object({
		username: z.string().trim(),
		password: z.string().trim(),
	}),
});

export type LoginUserSchema = z.infer<typeof loginUserSchema>;

export const userProfileTitleSchema = z.object({
	body: z.object({
		title: z.string().max(30).trim(),
	}),
});

export type UserProfileTitleSchema = z.infer<typeof userProfileTitleSchema>;

export const userProfileBioSchema = z.object({
	body: z.object({
		bio: z.string().max(80).trim(),
	}),
});

export type UserProfileBioSchema = z.infer<typeof userProfileBioSchema>;

export const userSocialsSchema = z.object({
	body: z.object({
		key: z.union([
			z.literal('instagram'),
			z.literal('linkedin'),
			z.literal('twitter'),
			z.literal('website'),
			z.literal('youtube'),
			z.literal('facebook'),
			z.literal('email'),
		]),
		value: z.string().trim().url(),
	}),
});

export type UserSocialsSchema = z.infer<typeof userSocialsSchema>;
