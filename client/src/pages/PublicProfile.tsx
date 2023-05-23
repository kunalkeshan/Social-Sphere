import ShareIcon from '@mui/icons-material/Share';
import { Link, User } from '../../../@types/';
import { IconButton } from '@mui/material';
import PublicSocials from '../components/cards/PublicSocials';

const PublicProfile = () => {
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

	const LINKS: Link[] = [];

	return (
		<main className='max-w-5xl mx-auto w-full px-4 py-8 grid grid-cols-1 gap-8'>
			<section className='flex items-center w-full justify-between'>
				<p className='font-heading text-3xl font-semibold'>
					{PROFILE.fullName}
				</p>
				<IconButton>
					<ShareIcon className='text-white' />
				</IconButton>
			</section>
			<section className=''>
				<header className='flex items-center justify-center flex-col gap-2'>
					<div className='max-w-[8rem] rounded-full overflow-hidden'>
						<img
							src={PROFILE.avatar}
							alt={PROFILE.fullName}
							className='w-full h-auto object-contain'
						/>
					</div>
					<h1 className='font-heading text-3xl'>{PROFILE.title}</h1>
					<h2 className=''>{PROFILE.bio}</h2>
				</header>
			</section>
			<section className='flex items-center justify-center w-full'>
				<PublicSocials socials={PROFILE.socials} />
			</section>
		</main>
	);
};

export default PublicProfile;
