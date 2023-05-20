/**
 * Application Configuration
 */

// Dependencies
import dotenv from 'dotenv';

dotenv.config();

export const IS_PRODUCTION = process.env.NODE_ENV === 'production';
export const PORT = process.env.PORT || 5000;

export const MONGODB = {
	DB_CONN_STRING: process.env.DB_CONN_STRING,
	DB_NAME: process.env.DB_NAME,
	USERS_COLLECTION_NAME: process.env.USERS_COLLECTION_NAME,
};