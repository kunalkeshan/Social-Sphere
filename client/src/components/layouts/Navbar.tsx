/**
 * Navbar Component
 */

// Dependencies
import { Box, AppBar, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
	return (
		<Box component={'nav'}>
			<AppBar position='static' className='!bg-primary'>
				<Toolbar
					sx={{ maxWidth: 'xl' }}
					className='w-full flex justify-between mx-auto py-6'
				>
					<Typography
						component='a'
						href='/'
						sx={{
							flexGrow: 1,
							fontFamily: 'Syne',
							fontSize: '2rem',
						}}
					>
						Social Sphere
					</Typography>
					<Link
						to={'/login'}
						className='px-8 py-4 border-2 border-white font-heading w-fit font-semibold hover:bg-white hover:text-primary transition-all'
					>
						Login / Signup
					</Link>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default Navbar;
