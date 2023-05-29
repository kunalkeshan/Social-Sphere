/**
 * Signup Page
 */

// Dependencies
import {
	Grid,
	CssBaseline,
	Box,
	Avatar,
	TextField,
	Paper,
	IconButton,
	InputAdornment,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useAppDispatch } from '../hooks/hooks';
import apiService from '../service/apiService';
import { toast } from 'react-hot-toast';
import { loginUser } from '../store/features/user';
import { isAxiosError } from 'axios';
import { User } from '../../../@types';

interface SignupUserResponse {
	user: User;
	token: string;
	message: string;
}

const Signup = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [input, setInput] = useState({
		username: '',
		password: '',
		email: '',
		fullName: '',
	});
	const [loading, setLoading] = useState(false);

	const dispatch = useAppDispatch();

	const handleInput =
		(props: keyof typeof input) =>
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setInput((prev) => {
				return {
					...prev,
					[props]: e.target.value,
				};
			});
		};

	const handleClickShowPassword = () => setShowPassword(!showPassword);
	const handleMouseDownPassword = () => setShowPassword(!showPassword);

	const handleSignup = async (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			setLoading(true);
			const response = await apiService.post<SignupUserResponse>(
				'/api/user/',
				{ ...input }
			);
			if (response.status === 201) {
				toast.success('Sign Up Success! Redirecting to Dashboard!');
				setTimeout(() => {
					dispatch(loginUser({ ...response.data }));
				}, 1000);
			}
		} catch (error) {
			console.log(isAxiosError(error), error);
			if (isAxiosError(error)) {
				if (
					error.response?.data?.message ===
					'user/account-already-exists'
				) {
					toast.error(`Account already exists.`);
				} else {
					toast.error('Something went wrong. Try again later');
				}
			} else {
				toast.error('Something went wrong. Try again later');
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<Grid container component='main' sx={{ height: '100vh' }}>
			<CssBaseline />
			<Grid
				item
				xs={false}
				sm={4}
				md={7}
				sx={{
					backgroundImage: 'url(/signup.svg)',
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
				sx={{ fontFamily: 'Inter', background: '#2A2A2A' }}
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
						Sign up
					</h1>
					<form className='mt-1' onSubmit={handleSignup}>
						<TextField
							margin='normal'
							required
							fullWidth
							label='Full Name'
							autoComplete='full-name'
							type='text'
							autoFocus
							sx={{
								borderColor: 'white',
								input: {
									color: 'white',
								},
								label: {
									color: 'white',
								},
								'&.MuiTextField-root': {
									borderColor: 'white',
								},
							}}
							variant='filled'
							value={input.fullName}
							onChange={handleInput('fullName')}
						/>
						<TextField
							margin='normal'
							required
							fullWidth
							label='Email Address'
							autoComplete='email'
							type='email'
							autoFocus
							sx={{
								borderColor: 'white',
								input: {
									color: 'white',
								},
								label: {
									color: 'white',
								},
								'&.MuiTextField-root': {
									borderColor: 'white',
								},
							}}
							variant='filled'
							value={input.email}
							onChange={handleInput('email')}
						/>
						<TextField
							margin='normal'
							required
							fullWidth
							label='Username'
							autoComplete='username'
							type='text'
							autoFocus
							sx={{
								borderColor: 'white',
								input: {
									color: 'white',
								},
								label: {
									color: 'white',
								},
								'&.MuiTextField-root': {
									borderColor: 'white',
								},
							}}
							variant='filled'
							value={input.username}
							onChange={handleInput('username')}
						/>
						<TextField
							margin='normal'
							required
							fullWidth
							label='Password'
							type={showPassword ? 'text' : 'password'}
							autoComplete='current-password'
							sx={{
								borderColor: 'white',
								input: {
									color: 'white',
								},
								label: {
									color: 'white',
								},
								'&.MuiTextField-root': {
									borderColor: 'white',
								},
							}}
							variant='filled'
							value={input.password}
							onChange={handleInput('password')}
							InputProps={{
								endAdornment: (
									<InputAdornment position='end'>
										<IconButton
											aria-label='toggle password visibility'
											onClick={handleClickShowPassword}
											onMouseDown={
												handleMouseDownPassword
											}
											sx={{
												color: 'white',
											}}
										>
											{showPassword ? (
												<Visibility />
											) : (
												<VisibilityOff />
											)}
										</IconButton>
									</InputAdornment>
								),
							}}
						/>
						<button
							type='submit'
							className={`cursor-pointer ${
								loading
									? 'cursor-default opacity-60'
									: 'hover:bg-white hover:text-primary'
							} px-4 text-white my-4 w-full py-2 border-2 border-white font-heading font-semibold transition-all`}
							disabled={loading}
						>
							{loading ? 'Creating Account...' : 'Sign Up'}
						</button>
						<Grid container>
							<Grid item>
								<Link
									to='/login'
									className='underline underline-offset-2 text-gray-500 hover:text-white transition-all'
								>
									{'Already have an account? Log in'}
								</Link>
							</Grid>
						</Grid>
					</form>
				</Box>
			</Grid>
		</Grid>
	);
};

export default Signup;
