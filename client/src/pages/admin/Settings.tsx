import { useState } from 'react';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PublicIcon from '@mui/icons-material/Public';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { User } from '../../../../@types';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

const Settings = () => {
	const PROFILE: User = {
		fullName: 'Kunal Keshan',
		email: 'kunalkeshan12@gmail.com',
		username: 'kunalkeshan',
		password:
			'$2a$10$65z5LeDJ5D0lnyzB6AC7megCyhbUj.sz8iW6WpS2mX7TVUET./Xvu',
		publicId: '93e06117-b471-474d-99b3-bebc231ba481',
		avatar: 'https://api.dicebear.com/6.x/thumbs/svg?seed=93e06117-b471-474d-99b3-bebc231ba481',
		title: 'kunalkeshan',
		bio: 'I help build websites.',
		socials: {
			website: 'https://kunalkeshan.dev',
			instagram: 'https://instagram.com/kunalkeshan',
		},
	};

	const { user } = useAppSelector((state) => state.user);

	return (
		<section className='col-span-3 md:col-span-2 md:border-r border-gray-500 px-2 md:px-8'>
			<h1 className='font-heading text-3xl'>Settings</h1>
			<hr className='w-full mt-2 border-b border-b-gray-500' />
			<div className='flex flex-col px-8 py-4 border-2 border-white gap-2 w-full mt-6'>
				<h2 className='font-heading flex items-center font-bold gap-4 text-xl'>
					<TagFacesIcon fontSize='medium' /> <span>Social Icons</span>
				</h2>
				<div className='mt-4 flex flex-col gap-4 text-sm md:text-base lg:text-lg'>
					<div className='flex gap-4'>
						<InstagramIcon />
						<input
							type='text'
							value={PROFILE.socials?.instagram}
							className='bg-transparent w-full text-gray-500 outline-none hover:text-white transition-all hover:underline focus:underline focus:text-white'
						/>
					</div>

					<div className='flex gap-4'>
						<FacebookIcon />
						<input
							type='text'
							value={user?.socials?.facebook ?? ''}
							className='bg-transparent w-full text-gray-500 outline-none hover:text-white transition-all hover:underline focus:underline focus:text-white'
						/>
					</div>

					<div className='flex gap-4'>
						<LinkedInIcon />
						<input
							type='text'
							value={user?.socials?.linkedin ?? ''}
							className='bg-transparent w-full text-gray-500 outline-none hover:text-white transition-all hover:underline focus:underline focus:text-white'
						/>
					</div>

					<div className='flex gap-4'>
						<TwitterIcon />
						<input
							type='text'
							value={user?.socials?.twitter ?? ''}
							className='bg-transparent w-full text-gray-500 outline-none hover:text-white transition-all hover:underline focus:underline focus:text-white'
						/>
					</div>

					<div className='flex gap-4'>
						<YouTubeIcon />
						<input
							type='text'
							value={user?.socials?.youtube ?? ''}
							className='bg-transparent w-full text-gray-500 outline-none hover:text-white transition-all hover:underline focus:underline focus:text-white'
						/>
					</div>

					<div className='flex gap-4'>
						<PublicIcon />
						<input
							type='text'
							value={user?.socials?.website ?? ''}
							className='bg-transparent w-full text-gray-500 outline-none hover:text-white transition-all hover:underline focus:underline focus:text-white'
						/>
					</div>

					<div className='flex gap-4'>
						<EmailIcon />
						<input
							type='text'
							value={user?.socials?.email ?? ''}
							className='bg-transparent w-full text-gray-500 outline-none hover:text-white transition-all hover:underline focus:underline focus:text-white'
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Settings;
