/**
 * Link Component - Public
 */

// Dependencies
import React from 'react';
import { Link as ILink } from '../../../../@types';
import IosShareIcon from '@mui/icons-material/IosShare';

type PublicLinkProps = ILink;

const PublicLink: React.FC<PublicLinkProps> = ({ title, description, url }) => {
	return (
		<a
			href={url}
			target='_blank'
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
