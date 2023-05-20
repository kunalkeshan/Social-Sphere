import type { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError, z } from 'zod';
import { ApiError } from './apiError';

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
