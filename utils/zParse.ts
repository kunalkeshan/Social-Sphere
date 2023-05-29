/**
 * Schema Validator for Incoming requests
 */

// Dependencies
import type { Request } from 'express';
import { AnyZodObject, z } from 'zod';
import { ApiError } from './apiError';

/**
 *
 * @param schema ZodSchema
 * @param req Request - Express Request object
 * @returns { req } - Parsed Schema
 * @example const {body: {email}} = zParse(checkEmailSchema, req)
 */
export async function zParse<T extends AnyZodObject>(
	schema: T,
	req: Request
): Promise<z.infer<T>> {
	try {
		return await schema.parseAsync(req);
	} catch (error) {
		throw new ApiError({
			message: 'app/invalid-data-request',
			statusCode: 400,
			data: { error },
		});
	}
}
