import {
	Grid,
	CssBaseline,
	Box,
	Avatar,
	Typography,
	TextField,
	Button,
	Paper,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link } from 'react-router-dom';

const Login = () => {
	return (
		<Grid container component='main' sx={{ height: '100vh' }}>
			<CssBaseline />
			<Grid
				item
				xs={false}
				sm={4}
				md={7}
				sx={{
					backgroundImage: 'url(/login.svg)',
					backgroundRepeat: 'no-repeat',
					backgroundColor: (t) =>
						t.palette.mode === 'light'
							? t.palette.grey[50]
							: t.palette.grey[900],
					backgroundSize: '60% 60%',
					backgroundPosition: 'center',
				}}
			/>
			<Grid
				item
				xs={12}
				sm={8}
				md={5}
				component={Paper}
				elevation={6}
				square
				sx={{ background: '#2A2A2A', fontFamily: 'Inter' }}
				className='!text-white'
			>
				<Box
					sx={{
						my: 8,
						mx: 4,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<LockOutlinedIcon />
					</Avatar>
					<h1 className='font-heading text-3xl md:text-5xl font-semibold'>
						Log in
					</h1>
					<Box component='form' noValidate sx={{ mt: 1 }}>
						<TextField
							margin='normal'
							required
							fullWidth
							label='Username'
							autoComplete='username'
							type='text'
							autoFocus
							sx={{
								color: 'white',
								'*': { color: 'inherit', borderColor: 'white' },
							}}
						/>
						<TextField
							margin='normal'
							required
							fullWidth
							label='Password'
							type='password'
							autoComplete='current-password'
							sx={{
								color: 'white',
								'*': { color: 'inherit', borderColor: 'white' },
							}}
						/>
						<button
							type='submit'
							className='px-4 my-4 w-full py-2 border-2 border-white font-heading font-semibold hover:bg-white hover:text-primary transition-all'
						>
							Sign In
						</button>
						<Grid container>
							<Grid item xs>
								<Link
									to='/forgot-password'
									className='underline underline-offset-2 text-gray-500 hover:text-white transition-all'
								>
									Forgot password?
								</Link>
							</Grid>
							<Grid item>
								<Link
									to='/signup'
									className='underline underline-offset-2 text-gray-500 hover:text-white transition-all'
								>
									{"Don't have an account? Sign Up"}
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Grid>
		</Grid>
	);
};

export default Login;
