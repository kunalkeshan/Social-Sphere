/**
 * Link Request Schema
 */

// Dependencies
import { z } from 'zod';

export const createLinkSchema = z.object({
	body: z.object({
		title: z.string().max(80).trim(),
		description: z.string().max(80).trim(),
		url: z.string().url(),
	}),
});

export type CreateLinkSchema = z.infer<typeof createLinkSchema>;
