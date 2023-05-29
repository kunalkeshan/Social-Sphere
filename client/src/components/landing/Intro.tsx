/**
 * Intro Section - Landing Page
 */

// Dependencies
import { Link } from 'react-router-dom';

const Intro = () => {
	return (
		<section className='max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 mt-8 md:mt-16 gap-12'>
			<div className='flex flex-col gap-8 items-center text-center md:items-start md:text-left'>
				<h1 className='font-heading text-3xl md:text-5xl'>
					Share social media and personalized links on your own page.
				</h1>
				<p className='text-lg md:text-2xl'>
					Simplify your online presence with a web app that lets you
					create a personal page to share your social media and
					personalized links.
				</p>
				<Link
					to='/signup'
					className='px-8 py-4 border-2 border-white font-heading w-fit font-semibold hover:bg-white hover:text-primary transition-all'
				>
					Get started
				</Link>
			</div>
			<div className='flex items-center justify-center'>
				<div className='max-w-xl'>
					<img
						src='/landing-intro.svg'
						alt='Social Sphere'
						className='w-full h-auto object-contain'
					/>
				</div>
			</div>
		</section>
	);
};

export default Intro;
