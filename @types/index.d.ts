import { ObjectId } from 'mongodb';

interface User {
	fullName: string;
	username: string;
	email: string;
	password: string;
	avatar: string;
	publicId: string;
	title?: string;
	bio?: string;
	socials?: {
		instagram?: string;
		linkedin?: string;
		twitter?: string;
		email?: string;
		website?: string;
		facebook?: string;
		youtube?: string;
	};
	id?: ObjectId;
	_id?: ObjectId;
}

interface Link {
	title: string;
	description: string;
	url: string;
	userId: string;
	id?: ObjectId;
	_id?: ObjectId;
}

interface Analytics {
	clickCount: number;
	clickedAt: Array<Date>;
	linkId: Link['id'];
	id?: ObjectId;
	_id?: ObjectId;
}
