/**
 * Admin Appearance Page
 */

// Dependencies
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import apiService from '../../service/apiService';
import { toast } from 'react-hot-toast';
import { updateUserDetails } from '../../store/features/user';

const Appearance = () => {
	const { user } = useAppSelector((state) => state.user);
	const [input, setInput] = useState({
		title: user?.title ?? '',
		bio: user?.bio ?? '',
	});

	const dispatch = useAppDispatch();

	const handleInput =
		(prop: keyof typeof input) =>
		(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			setInput((prev) => {
				if (prop === 'title' && e.target.value.length > 30) {
					return prev;
				} else if (prop === 'bio' && e.target.value.length > 80) {
					return prev;
				}
				return { ...prev, [prop]: e.target.value };
			});
		};

	const handleUpdateTitle = async () => {
		try {
			if (input.title.length > 30) {
				toast('Title cannot be more than 30 characters');
				return;
			}
			const response = await apiService.post(
				'/api/user/profile/title',
				{ title: input.title },
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							'SocialSphereUserToken'
						)}`,
					},
				}
			);
			if (response.status === 200) {
				dispatch(updateUserDetails({ title: input.title }));
			}
		} catch (error) {
			toast.error('Unable to update title. Try again later.');
		}
	};

	const handleUpdateBio = async () => {
		try {
			if (input.bio.length > 80) {
				toast('Bio cannot be more than 80 characters');
				return;
			}
			const response = await apiService.post(
				'/api/user/profile/bio',
				{ bio: input.bio },
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							'SocialSphereUserToken'
						)}`,
					},
				}
			);
			if (response.status === 200) {
				dispatch(updateUserDetails({ bio: input.bio }));
			}
		} catch (error) {
			toast.error('Unable to update bio. Try again later.');
		}
	};

	return (
		<section className='col-span-3 md:col-span-2 md:border-r border-gray-500 px-2 md:px-8'>
			<h1 className='font-heading text-3xl'>Profile</h1>
			<div className='flex flex-col px-8 py-4 border-2 border-white gap-2 w-full mt-6'>
				<div className='flex items-center gap-4 flex-wrap justify-center md:justify-start'>
					<div className='rounded-full overflow-hidden w-24 h-24'>
						<img
							src={user?.avatar}
							alt={user?.fullName}
							className='w-full h-auto object-contain'
						/>
					</div>
					<div className='px-6 relative cursor-pointer py-3 border-2 overflow-hidden group border-white font-heading w-fit font-semibold hover:bg-white hover:text-primary transition-all'>
						<input
							disabled
							type='file'
							accept='image/*'
							className='block'
						/>
						<span className='absolute flex transition-all items-center justify-center flex-wrap group-hover:top-0 top-full left-0 bg-white text-primary w-full h-full'>
							Custom Images Coming Soon!
						</span>
					</div>
				</div>
				<div className='flex flex-col gap-1 relative'>
					<input
						type='text'
						className='px-4 pt-6 pb-2 border-white border-2 w-full placeholder:text-primary text-white bg-transparent'
						placeholder='Title'
						value={input.title}
						onChange={handleInput('title')}
					/>
					<span className='text-sm absolute top-2 text-gray-500 left-4'>
						Title
					</span>
					<p className='self-end flex gap-4 text-xs'>
						{input.title !== user?.title && (
							<span
								onClick={handleUpdateTitle}
								className='underline underline-offset-2 hover:text-green-500 transition-all cursor-pointer'
							>
								Save
							</span>
						)}
						<span
							className={`${
								input.title.length > 30 ? 'text-red-500' : ''
							} `}
						>
							{input.title.length} / 30
						</span>
					</p>
				</div>
				<div className='flex flex-col gap-1 relative'>
					<textarea
						value={input.bio}
						onChange={handleInput('bio')}
						placeholder='Bio'
						className='px-4 pt-6 pb-2 border-white border-2 w-full placeholder:text-primary text-white bg-transparent'
					/>
					<span className='text-sm absolute top-2 text-gray-500 left-4'>
						Bio
					</span>
					<p className='self-end text-xs flex gap-4'>
						{input.bio !== user?.bio && (
							<span
								onClick={handleUpdateBio}
								className='underline underline-offset-2 hover:text-green-500 transition-all cursor-pointer'
							>
								Save
							</span>
						)}
						<span
							className={`${
								input.bio.length > 80 ? 'text-red-500' : ''
							} `}
						>
							{input.bio.length} / 80
						</span>
					</p>
				</div>
			</div>
		</section>
	);
};

export default Appearance;
