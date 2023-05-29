/**
 * Profile Socials Component - Public
 */

// Dependencies
import React from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PublicIcon from '@mui/icons-material/Public';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { User } from '../../../../@types';

type PublicSocialsProps = Pick<User, 'socials'>;

const PublicSocials: React.FC<PublicSocialsProps> = ({ socials }) => {
	return (
		<div className='w-fit flex items-center gap-6 flex-wrap'>
			{socials?.website && (
				<a href={socials?.website} target='_blank'>
					<PublicIcon />
				</a>
			)}
			{socials?.instagram && (
				<a href={socials?.instagram} target='_blank'>
					<InstagramIcon />
				</a>
			)}
			{socials?.facebook && (
				<a href={socials?.facebook} target='_blank'>
					<FacebookIcon />
				</a>
			)}
			{socials?.linkedin && (
				<a href={socials?.linkedin} target='_blank'>
					<LinkedInIcon />
				</a>
			)}
			{socials?.youtube && (
				<a href={socials?.youtube} target='_blank'>
					<YouTubeIcon />
				</a>
			)}
			{socials?.twitter && (
				<a href={socials?.twitter} target='_blank'>
					<TwitterIcon />
				</a>
			)}
			{socials?.email && (
				<a href={socials?.email} target='_blank'>
					<EmailIcon />
				</a>
			)}
		</div>
	);
};

export default PublicSocials;
