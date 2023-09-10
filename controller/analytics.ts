/**
 * Analytics Controller
 */

// Dependencies
import { ObjectId } from 'mongodb';
import { collections } from '../services/database';
import { ApiError } from '../utils/apiError';
import { UpdateLinkCountSchema } from '../schema/analytics';
import { Analytics } from '../@types';

export const updateLinkCountController = async (
	data: UpdateLinkCountSchema
) => {
	const analytics = await collections.analytics.findOne({
		linkId: new ObjectId(data.body.linkId),
	});
	if (!analytics) {
		const newAnalytics = {
			linkId: new ObjectId(data.body.linkId),
			clickCount: 1,
			clickedAt: [new Date()],
		} as Analytics;
		const result = collections.analytics.insertOne(newAnalytics);
		if (result) {
			return Promise.resolve();
		} else {
			throw new ApiError({
				statusCode: 500,
				message: 'analytics/unable-to-update-link-count',
			});
		}
	}
	const response = await collections.analytics.updateOne(
		{ linkId: new ObjectId(data.body.linkId) },
		{ $inc: { clickCount: 1 }, $push: { clickedAt: new Date() } }
	);
	if (response) {
		return Promise.resolve();
	} else {
		throw new ApiError({
			message: 'analytics/unable-to-update-link-count',
			statusCode: 500,
		});
	}
};
