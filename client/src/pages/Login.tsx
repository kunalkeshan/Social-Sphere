/**
 * Login Page
 */

// Dependencies
import React, { useState } from 'react';
import {
	Grid,
	CssBaseline,
	Box,
	Avatar,
	TextField,
	Paper,
	InputAdornment,
	IconButton,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import apiService from '../service/apiService';
import { User } from '../../../@types';
import { isAxiosError } from 'axios';
import { toast } from 'react-hot-toast';
import { useAppDispatch } from '../hooks/hooks';
import { loginUser } from '../store/features/user';

interface LoginUserResponse {
	user: User;
	token: string;
	message: string;
}

const Login = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [input, setInput] = useState({ username: '', password: '' });
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

	const handleLogin = async (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			setLoading(true);
			const response = await apiService.post<LoginUserResponse>(
				'/api/user/login',
				{ ...input }
			);
			if (response.status === 200) {
				toast.success('Login in Success! Redirecting to Dashboard!');
				setTimeout(() => {
					dispatch(loginUser({ ...response.data }));
				}, 1000);
			}
		} catch (error) {
			console.log(isAxiosError(error), error);
			if (isAxiosError(error)) {
				if (
					error.response?.data?.message ===
					'user/account-does-not-exists'
				) {
					toast.error(
						`Account with username: ${input.username} does not exist.`
					);
				} else if (
					error.response?.data?.message === 'user/incorrect-password'
				) {
					toast.error('Incorrect Password! Try again.');
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
					<form className='mt-1' onSubmit={handleLogin}>
						<TextField
							margin='normal'
							required
							fullWidth
							label='Username'
							autoComplete='username'
							type='text'
							autoFocus
							value={input.username}
							onChange={handleInput('username')}
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
						/>
						<TextField
							margin='normal'
							required
							fullWidth
							label='Password'
							type={showPassword ? 'text' : 'password'}
							autoComplete='current-password'
							value={input.password}
							onChange={handleInput('password')}
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
							{loading ? 'Logging In...' : 'Log In'}
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
					</form>
				</Box>
			</Grid>
		</Grid>
	);
};

export default Login;
