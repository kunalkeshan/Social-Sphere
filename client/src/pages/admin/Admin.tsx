/**
 * Admin Layout Page
 */

// Dependencies
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
import UnderConstruction from '../../components/reusable/UnderConstruction';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { logoutUser } from '../../store/features/user';
import ShareIcon from '@mui/icons-material/Share';
import { toast } from 'react-hot-toast';

const pages = [
	{
		page: 'Links',
		url: '/admin',
	},
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

	const dispatch = useAppDispatch();
	const { user } = useAppSelector((state) => state.user);

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

	const handleLogout = () => {
		dispatch(logoutUser());
	};

	const handleShareProfile = () => {
		const shareData = {
			title: `${user?.fullName} - Social Sphere Profile`,
			text: user?.bio,
			url: `${location.protocol}://${location.host}${location.pathname}`,
		};
		if (navigator.canShare(shareData)) {
			navigator.share(shareData);
		} else {
			toast('Browser does not support sharing.');
		}
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
							<div className='flex items-center gap-2 md:gap-4'>
								<Tooltip title='Open settings'>
									<IconButton
										onClick={handleOpenUserMenu}
										sx={{ p: 0 }}
									>
										<Avatar
											alt={user?.fullName ?? ''}
											src={user?.avatar ?? ''}
										/>
									</IconButton>
								</Tooltip>
								<Tooltip title='Share profile'>
									<IconButton
										onClick={handleShareProfile}
										className='transition-all hover:!bg-white group'
									>
										<ShareIcon className='text-white group-hover:!text-primary transition-all' />
									</IconButton>
								</Tooltip>
							</div>
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
								<MenuItem onClick={handleLogout}>
									Logout
								</MenuItem>
							</Menu>
						</Box>
					</Toolbar>
				</Container>
			</AppBar>
			<main className='max-w-7xl px-16 py-12 mx-auto grid grid-cols-3 min-h-[80vh]'>
				<Outlet />
				<section className='hidden md:flex flex-col text-center items-center'>
					<p className='text-2xl font-heading font-bold'>
						Page preview
					</p>
					<UnderConstruction />
					<p>Coming soon!</p>
				</section>
			</main>
		</>
	);
};

export default Admin;
