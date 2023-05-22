import { Box, AppBar, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
	return (
		<Box component={'nav'}>
			<AppBar position='static' className='!bg-primary'>
				<Toolbar
					sx={{ maxWidth: 'xl' }}
					className='w-full flex justify-between mx-auto'
				>
					<Typography
						variant='h6'
						component='a'
						href='/'
						sx={{ flexGrow: 1, fontFamily: 'Syne' }}
					>
						Social Sphere
					</Typography>
					<Link to={'/login'}>Login / Signup</Link>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default Navbar;
