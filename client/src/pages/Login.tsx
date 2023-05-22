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
					backgroundSize: 'contain',
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
					<Typography component='h1' variant='h5'>
						Log in
					</Typography>
					<Box component='form' noValidate sx={{ mt: 1 }}>
						<TextField
							margin='normal'
							required
							fullWidth
							label='Username'
							autoComplete='username'
							type='text'
							autoFocus
						/>
						<TextField
							margin='normal'
							required
							fullWidth
							label='Password'
							type='password'
							autoComplete='current-password'
						/>
						<Button
							type='submit'
							fullWidth
							variant='contained'
							sx={{ mt: 3, mb: 2 }}
						>
							Sign In
						</Button>
						<Grid container>
							<Grid item xs>
								<Link
									to='#'
									className='underline underline-offset-2'
								>
									Forgot password?
								</Link>
							</Grid>
							<Grid item>
								<Link
									to='#'
									className='underline underline-offset-2'
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
