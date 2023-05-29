/**
 * Admin Settings Page
 */

// Dependencies
import { useState } from 'react';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PublicIcon from '@mui/icons-material/Public';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import DoneIcon from '@mui/icons-material/Done';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { toast } from 'react-hot-toast';
import apiService from '../../service/apiService';
import { updateUserDetails } from '../../store/features/user';

interface UpdateSocialsResponse {
	message: string;
}

const Settings = () => {
	const { user } = useAppSelector((state) => state.user);
	const dispatch = useAppDispatch();
	const [input, setInput] = useState({
		instagram: user?.socials?.instagram ?? '',
		linkedin: user?.socials?.linkedin ?? '',
		twitter: user?.socials?.twitter ?? '',
		website: user?.socials?.website ?? '',
		youtube: user?.socials?.youtube ?? '',
		email: user?.socials?.email ?? '',
		facebook: user?.socials?.facebook ?? '',
	});

	const handleInput =
		(prop: keyof typeof input) =>
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setInput((prev) => {
				return { ...prev, [prop]: e.target.value };
			});
		};

	const handleSaveSocial = (prop: keyof typeof input) => async () => {
		try {
			if (input[prop].length === 0) {
				toast.error(`${prop} link cannot be empty.`);
				return;
			}
			const response = await apiService.post<UpdateSocialsResponse>(
				'/api/user/profile/socials',
				{ key: prop, value: input[prop] },
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							'SocialSphereUserToken'
						)}`,
					},
				}
			);
			if (response.status === 200) {
				dispatch(updateUserDetails({ socials: input }));
			}
		} catch (error) {
			toast.error('Something went wrong. Try again later.');
		}
	};

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
							className='bg-transparent w-full text-gray-500 outline-none hover:text-white transition-all hover:underline focus:underline focus:text-white'
							value={input.instagram}
							onChange={handleInput('instagram')}
							placeholder='Click to enter you Instagram URL.'
						/>
						{input.instagram !== user?.socials?.instagram && (
							<DoneIcon
								className='cursor-pointer text-gray-500 hover:text-white'
								onClick={handleSaveSocial('instagram')}
							/>
						)}
					</div>

					<div className='flex gap-4'>
						<FacebookIcon />
						<input
							type='text'
							className='bg-transparent w-full text-gray-500 outline-none hover:text-white transition-all hover:underline focus:underline focus:text-white'
							value={input.facebook}
							onChange={handleInput('facebook')}
							placeholder='Click to enter you Facebook URL.'
						/>
						{input.facebook !== user?.socials?.facebook && (
							<DoneIcon
								className='cursor-pointer text-gray-500 hover:text-white'
								onClick={handleSaveSocial('facebook')}
							/>
						)}
					</div>

					<div className='flex gap-4'>
						<LinkedInIcon />
						<input
							type='text'
							className='bg-transparent w-full text-gray-500 outline-none hover:text-white transition-all hover:underline focus:underline focus:text-white'
							value={input.linkedin}
							onChange={handleInput('linkedin')}
							placeholder='Click to enter you LinkedIn URL.'
						/>
						{input.linkedin !== user?.socials?.linkedin && (
							<DoneIcon
								className='cursor-pointer text-gray-500 hover:text-white'
								onClick={handleSaveSocial('linkedin')}
							/>
						)}
					</div>

					<div className='flex gap-4'>
						<TwitterIcon />
						<input
							type='text'
							className='bg-transparent w-full text-gray-500 outline-none hover:text-white transition-all hover:underline focus:underline focus:text-white'
							value={input.twitter}
							onChange={handleInput('twitter')}
							placeholder='Click to enter you Twitter URL.'
						/>
						{input.twitter !== user?.socials?.twitter && (
							<DoneIcon
								className='cursor-pointer text-gray-500 hover:text-white'
								onClick={handleSaveSocial('twitter')}
							/>
						)}
					</div>

					<div className='flex gap-4'>
						<YouTubeIcon />
						<input
							type='text'
							className='bg-transparent w-full text-gray-500 outline-none hover:text-white transition-all hover:underline focus:underline focus:text-white'
							value={input.youtube}
							onChange={handleInput('youtube')}
							placeholder='Click to enter you YouTube URL.'
						/>
						{input.youtube !== user?.socials?.youtube && (
							<DoneIcon
								className='cursor-pointer text-gray-500 hover:text-white'
								onClick={handleSaveSocial('youtube')}
							/>
						)}
					</div>

					<div className='flex gap-4'>
						<PublicIcon />
						<input
							type='text'
							className='bg-transparent w-full text-gray-500 outline-none hover:text-white transition-all hover:underline focus:underline focus:text-white'
							value={input.website}
							onChange={handleInput('website')}
							placeholder='Click to enter you Website URL.'
						/>
						{input.website !== user?.socials?.website && (
							<DoneIcon
								className='cursor-pointer text-gray-500 hover:text-white'
								onClick={handleSaveSocial('website')}
							/>
						)}
					</div>

					<div className='flex gap-4'>
						<EmailIcon />
						<input
							type='text'
							className='bg-transparent w-full text-gray-500 outline-none hover:text-white transition-all hover:underline focus:underline focus:text-white'
							value={input.email}
							onChange={handleInput('email')}
							placeholder='Click to enter you Email.'
						/>
						{input.email !== user?.socials?.email && (
							<DoneIcon
								className='cursor-pointer text-gray-500 hover:text-white'
								onClick={handleSaveSocial('email')}
							/>
						)}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Settings;
