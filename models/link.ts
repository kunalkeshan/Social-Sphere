// External dependencies
import { ObjectId } from 'mongodb';

// Class Implementation
export default class Link {
	constructor(
		public title: string,
		public description: string,
		public url: string,
		public userId: string,
		public id?: ObjectId,
		public _id?: ObjectId
	) {}
}
