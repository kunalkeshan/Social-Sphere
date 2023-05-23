import ShareIcon from '@mui/icons-material/Share';
import { Link, User } from '../../../@types/';
import { IconButton } from '@mui/material';
import PublicSocials from '../components/cards/PublicSocials';
import PublicLink from '../components/cards/PublicLink';

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

	const LINKS: Link[] = [
		{
			title: 'Blog',
			description: 'Visit to learn tech from a different perspective.',
			url: 'https://blog.kunalkeshan.dev/',
			userId: '93e06117-b471-474d-99b3-bebc231ba481',
		},
		{
			title: 'ECE Notes Initative',
			description:
				'Collections of notes for ECE dept. from 2020-24 - SRMIST.',
			url: 'https://notes.kunalkeshan.dev/',
			userId: '93e06117-b471-474d-99b3-bebc231ba481',
		},
		{
			title: 'Shiryoku (Resources)',
			description:
				'Open Source Collection of Resources to upskill in any field.',
			url: 'https://resources.kunalkeshan.dev/',
			userId: '93e06117-b471-474d-99b3-bebc231ba481',
		},
	];

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
			<section className='flex items-center justify-center flex-col gap-2'>
				<div className='max-w-[8rem] rounded-full overflow-hidden'>
					<img
						src={PROFILE.avatar}
						alt={PROFILE.fullName}
						className='w-full h-auto object-contain'
					/>
				</div>
				<h1 className='font-heading text-3xl'>{PROFILE.title}</h1>
				<h2 className=''>{PROFILE.bio}</h2>
			</section>
			<section className='my-8'>
				<div className='grid grid-cols-1 gap-6'>
					{LINKS.map((link, index) => (
						<PublicLink key={index} {...link} />
					))}
				</div>
			</section>
			<section className='flex items-center justify-center w-full flex-col gap-2'>
				<PublicSocials socials={PROFILE.socials} />
				<p className='font-heading text-sm font-semibold'>
					&copy; Social Sphere - {new Date().getFullYear()}
				</p>
			</section>
		</main>
	);
};

export default PublicProfile;
