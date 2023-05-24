import {
	AppBar,
	Avatar,
	Box,
	Container,
	IconButton,
	Menu,
	MenuItem,
	Toolbar,
	Tooltip,
	Typography,
} from '@mui/material';
import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, Outlet } from 'react-router-dom';

const pages = [
	{
		page: 'Appearance',
		url: 'appearance',
	},
	{
		page: 'Settings',
		url: 'settings',
	},
	{
		page: 'Analytics',
		url: 'analytics',
	},
];
const settings = [
	{
		page: 'Appearance',
		url: 'appearance',
	},
	{
		page: 'Settings',
		url: 'settings',
	},
	{
		page: 'Analytics',
		url: 'analytics',
	},
];

const Admin = () => {
	const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
		null
	);
	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
		null
	);

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	return (
		<>
			<AppBar position='static' className='!bg-primary'>
				<Container maxWidth='lg'>
					<Toolbar disableGutters>
						<Typography
							variant='h6'
							noWrap
							component='a'
							href='/admin'
							sx={{
								mr: 2,
								display: { xs: 'none', md: 'flex' },
								fontFamily: 'Syne',
								fontWeight: 700,
								color: 'inherit',
								textDecoration: 'none',
							}}
						>
							Social Sphere
						</Typography>
						<Box
							sx={{
								flexGrow: 1,
								display: { xs: 'flex', md: 'none' },
							}}
						>
							<IconButton
								size='large'
								aria-label='account of current user'
								aria-controls='menu-appbar'
								aria-haspopup='true'
								onClick={handleOpenNavMenu}
								color='inherit'
							>
								<MenuIcon />
							</IconButton>
							<Menu
								id='menu-appbar'
								anchorEl={anchorElNav}
								anchorOrigin={{
									vertical: 'bottom',
									horizontal: 'left',
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'left',
								}}
								open={Boolean(anchorElNav)}
								onClose={handleCloseNavMenu}
								sx={{
									display: { xs: 'block', md: 'none' },
								}}
							>
								{pages.map((page) => (
									<MenuItem
										key={page.url}
										onClick={handleCloseNavMenu}
									>
										<Link
											to={page.url}
											className='text-center'
										>
											{page.page}
										</Link>
									</MenuItem>
								))}
							</Menu>
						</Box>
						<Typography
							variant='h5'
							noWrap
							component='a'
							href='/admin'
							sx={{
								mr: 2,
								display: { xs: 'flex', md: 'none' },
								flexGrow: 1,
								fontFamily: 'Syne',
								fontWeight: 700,
								color: 'inherit',
								textDecoration: 'none',
							}}
						>
							Social Sphere
						</Typography>
						<Box
							sx={{
								flexGrow: 1,
								display: {
									xs: 'none',
									md: 'flex',
									gap: 20,
									fontFamily: 'Inter',
								},
							}}
						>
							{pages.map((page) => (
								<Link
									to={page.url}
									key={page.page}
									onClick={handleCloseNavMenu}
									className='hover:underline underline-offset-2'
								>
									{page.page}
								</Link>
							))}
						</Box>
						<Box sx={{ flexGrow: 0 }}>
							<Tooltip title='Open settings'>
								<IconButton
									onClick={handleOpenUserMenu}
									sx={{ p: 0 }}
								>
									<Avatar
										alt='Remy Sharp'
										src='/static/images/avatar/2.jpg'
									/>
								</IconButton>
							</Tooltip>
							<Menu
								sx={{ mt: '45px' }}
								id='menu-appbar'
								anchorEl={anchorElUser}
								anchorOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								open={Boolean(anchorElUser)}
								onClose={handleCloseUserMenu}
							>
								{settings.map((setting) => (
									<MenuItem
										key={setting.url}
										onClick={handleCloseUserMenu}
									>
										<Link
											to={setting.url}
											className='text-center'
										>
											{setting.page}
										</Link>
									</MenuItem>
								))}
								<MenuItem>Logout</MenuItem>
							</Menu>
						</Box>
					</Toolbar>
				</Container>
			</AppBar>
			<main className='max-w-7xl px-16 py-12 mx-auto'>
				<Outlet />
			</main>
		</>
	);
};

export default Admin;
