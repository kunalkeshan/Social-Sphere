/**
 * Link Request Schema
 */

// Dependencies
import { ObjectId } from 'mongodb';
import { z } from 'zod';

export const createLinkSchema = z.object({
	body: z.object({
		title: z.string().max(80).trim(),
		description: z.string().max(80).trim(),
		url: z.string().url().trim(),
	}),
});

export type CreateLinkSchema = z.infer<typeof createLinkSchema>;

export const editLinkSchema = z.object({
	body: z.object({
		id: z.string().refine((val) => {
			return ObjectId.isValid(val);
		}),
		key: z.union([
			z.literal('title'),
			z.literal('description'),
			z.literal('url'),
		]),
		value: z.union([
			z.string().trim().nonempty(),
			z.string().url().trim().nonempty(),
		]),
	}),
});

export type EditLinkSchema = z.infer<typeof editLinkSchema>;

export const deleteLinkSchema = z.object({
	body: z.object({
		id: z.string().refine((val) => {
			return ObjectId.isValid(val);
		}),
	}),
});

export type DeleteLinkSchema = z.infer<typeof deleteLinkSchema>;
