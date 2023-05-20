// External dependencies
import { ObjectId } from 'mongodb';

// Class Implementation
export default class User {
	constructor(
		public fullName: string,
		public username: string,
		public email: string,
		public password: string,
		public avatar: string,
		public publicId: string,
		public title?: string,
		public bio?: string,
		public id?: ObjectId,
		public _id?: ObjectId
	) {}
}
