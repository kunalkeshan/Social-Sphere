import { User } from '../../../../@types';

const Appearance = () => {
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

	return (
		<section className='col-span-3 md:col-span-2 md:border-r border-gray-500 px-2 md:px-8'>
			<h1 className='font-heading text-3xl'>Profile</h1>
			<div className='flex flex-col px-8 py-4 border-2 border-white gap-2 w-full mt-6'>
				<div className='flex items-center gap-4 flex-wrap justify-center md:justify-start'>
					<div className='rounded-full overflow-hidden w-24 h-24'>
						<img
							src={PROFILE.avatar}
							alt={PROFILE.fullName}
							className='w-full h-auto object-contain'
						/>
					</div>
					<input
						type='file'
						accept='image/*'
						className='px-6 py-3 border-2 border-white font-heading w-fit font-semibold hover:bg-white hover:text-primary transition-all'
					/>
				</div>
				<div className='flex flex-col gap-1 relative'>
					<input
						type='text'
						className='px-4 pt-6 pb-2 border-white border-2 w-full placeholder:text-primary text-white bg-transparent'
						placeholder='Title'
						value={PROFILE.title}
					/>
					<span className='text-sm absolute top-2 text-gray-500 left-4'>
						Title
					</span>
					<span className='self-end text-xs'>
						{PROFILE.title?.length} / 30
					</span>
				</div>
				<div className='flex flex-col gap-1 relative'>
					<textarea
						value={PROFILE.bio}
						placeholder='Bio'
						className='px-4 pt-6 pb-2 border-white border-2 w-full placeholder:text-primary text-white bg-transparent'
					/>
					<span className='text-sm absolute top-2 text-gray-500 left-4'>
						Bio
					</span>
					<span className='self-end text-xs'>
						{PROFILE.bio?.length} / 80
					</span>
				</div>
			</div>
		</section>
	);
};

export default Appearance;
