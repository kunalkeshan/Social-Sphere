/**
 * Custom Utilities
 */

// Dependencies

// Types
interface ApiErrorOptions {
	message: string;
	statusCode: number;
	data?: object;
}

/**
 * Api Error Utility
 * @returns instanceof ApiError
 * @example throw new ApiError({message: 'Uh, oh!', statusCode: 418})
 */
export class ApiError extends Error {
	public statusCode: number;
	public data: object | undefined;
	constructor({ message, statusCode, data }: ApiErrorOptions) {
		super();
		this.message = message;
		this.statusCode = statusCode;
		this.data = data;

		// Helps identify `instanceOf` applications
		Object.setPrototypeOf(this, ApiError.prototype);
	}
}
