import { Link } from '../../../../@types';
import CreateLink from '../../components/admin/CreateLink';
import AdminLink from '../../components/cards/AdminLink';

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

const Main = () => {
	return (
		<section className='col-span-3 md:col-span-2 md:border-r border-gray-500 px-2 md:px-8'>
			<CreateLink />
			<div className='mt-8 flex flex-col gap-8'>
				{LINKS.map((link, index) => (
					<AdminLink key={index} {...link} index={index} />
				))}
			</div>
		</section>
	);
};

export default Main;
