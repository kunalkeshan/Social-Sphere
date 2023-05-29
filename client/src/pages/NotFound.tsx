/**
 * Not Found Page
 */

// Dependencies
import { Link } from 'react-router-dom';
import Footer from '../components/layouts/Footer';
import Navbar from '../components/layouts/Navbar';

const NotFound = () => {
	return (
		<>
			<Navbar />
			<main className='w-full px-5 py-12 grid grid-cols-1 md:grid-cols-2 max-w-screen-2xl mx-auto text-center gap-8'>
				<div className='font-heading'>
					<h1 className='text-9xl md:text-[12rem]'>404</h1>
					<h2 className='text-4xl md:text-6xl'>Not Found</h2>
				</div>
				<div className='md:text-left flex justify-center flex-col gap-4'>
					<p className='text-xl md:text-3xl'>Page not found</p>
					<p className='text-base md:text-lg'>
						The page you're looking for doesn't exist or is missing.
					</p>
					<Link
						to='/'
						className='mx-auto md:mx-0 px-4 my-4 w-fit text-white py-2 border-2 border-white font-heading font-semibold hover:bg-white hover:text-primary transition-all'
					>
						Go Home
					</Link>
				</div>
			</main>
			<Footer />
		</>
	);
};

export default NotFound;
