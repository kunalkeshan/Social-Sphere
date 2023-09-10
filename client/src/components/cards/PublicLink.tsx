/**
 * Link Component - Public
 */

// Dependencies
import React from 'react';
import { Link as ILink } from '../../../../@types';
import IosShareIcon from '@mui/icons-material/IosShare';
import apiService from '../../service/apiService';

type PublicLinkProps = ILink;

const PublicLink: React.FC<PublicLinkProps> = ({
	title,
	description,
	url,
	_id,
}) => {
	const handleUpdateLinkCount = async () => {
		await apiService.post('/api/analytics/update-count', {
			linkId: _id,
		});
	};

	const handleUpdateLinkAnalytics = async () => {
		try {
			await handleUpdateLinkCount();
		} catch (error) {
			console.log(`Unable to update link ${_id} count.`);
		}
	};

	return (
		<a
			href={url}
			target='_blank'
			onClick={handleUpdateLinkAnalytics}
			className='bg-white text-black max-w-3xl w-full mx-auto rounded px-8 py-4 group transistion-all hover:scale-105 duration-300'
		>
			<div className='w-full flex items-center justify-between'>
				<div className='flex flex-col'>
					<span className='font-heading font-bold'>{title}</span>
					<span className='text-sm'>{description}</span>
				</div>
				<IosShareIcon className='!invisible group-hover:!visible transition-all duration-300' />
			</div>
		</a>
	);
};

export default PublicLink;
