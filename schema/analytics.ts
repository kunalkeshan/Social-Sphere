/**
 * Analytics Request Schema
 */

// Dependencies
import { ObjectId } from 'mongodb';
import { z } from 'zod';

export const updateLinkCountSchema = z.object({
	body: z.object({
		linkId: z.string().refine((val) => {
			return ObjectId.isValid(val);
		}),
	}),
});

export type UpdateLinkCountSchema = z.infer<typeof updateLinkCountSchema>;
