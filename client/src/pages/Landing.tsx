/**
 * Landing Page
 */

// Dependencies
import Features from '../components/landing/Features';
import Intro from '../components/landing/Intro';
import Footer from '../components/layouts/Footer';
import Navbar from '../components/layouts/Navbar';
import ForgotPasswordPage from './ForgotPassword';
import Login from './Login';

const Landing = () => {
	return (
		<>
			<Navbar />
			<main className='w-full px-5'>
				<Intro />
				<Features />
			</main>
			<Footer />
		</>
	);
};	

export default Landing;
