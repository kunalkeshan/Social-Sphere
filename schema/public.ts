/**
 * Public Request Schema
 */

// Dependencies
import { z } from 'zod';

export const userProfileSchema = z.object({
	params: z.object({
		username: z.string().trim(),
	}),
});

export type UserProfileSchema = z.infer<typeof userProfileSchema>;
