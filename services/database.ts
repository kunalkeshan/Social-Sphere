// External Dependencies
import * as mongoDB from 'mongodb';
import { MONGODB } from '../config';

// Global Variables
export const collections: { users?: mongoDB.Collection } = {};

// Initialize Connection
export async function connectToDatabase() {
	const client = new mongoDB.MongoClient(MONGODB.DB_CONN_STRING);

	await client.connect();

	const db: mongoDB.Db = client.db(MONGODB.DB_NAME);

	const usersCollection: mongoDB.Collection = db.collection(
		MONGODB.USERS_COLLECTION_NAME
	);

	collections.users = usersCollection;

	console.log(`Successfully connected to database: ${db.databaseName}.`);
}
