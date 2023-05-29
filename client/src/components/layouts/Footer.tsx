/**
 * Footer Component
 */

// Dependencies
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Footer = () => {
	return (
		<Box className='w-full my-6' component={'footer'}>
			<Box
				component={'p'}
				sx={{ maxWidth: 'xl' }}
				className='mx-auto text-center'
			>
				{'Copyright © '}
				<Link to='/' className='font-heading'>
					Social Sphere
				</Link>{' '}
				{new Date().getFullYear()}
				{'.'}
			</Box>
		</Box>
	);
};

export default Footer;
