import React, { PropsWithChildren } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Admin from './pages/admin/Admin';
import PublicProfile from './pages/PublicProfile';
import Main from './pages/admin/Main';
import Settings from './pages/admin/Settings';
import Appearance from './pages/admin/Appearance';
import Analytics from './pages/admin/Analytics';
import { useAppSelector } from './hooks/hooks';

function App() {
	const { user, token } = useAppSelector((state) => state.user);

	const CheckUserAlreadyLoggedIn: React.FC<PropsWithChildren> = ({
		children,
	}) => {
		return typeof user === 'object' && typeof token === 'string' ? (
			<Navigate to='/admin' />
		) : (
			<>{children}</>
		);
	};

	const ProtectedRoute: React.FC<PropsWithChildren> = ({ children }) => {
		return typeof user === 'object' && typeof token === 'string' ? (
			<>{children}</>
		) : (
			<Navigate to='/login' />
		);
	};

	return (
		<Routes>
			<Route path='/' element={<Landing />} />
			<Route
				path='/login'
				element={
					<CheckUserAlreadyLoggedIn>
						<Login />
					</CheckUserAlreadyLoggedIn>
				}
			/>
			<Route
				path='/signup'
				element={
					<CheckUserAlreadyLoggedIn>
						<Signup />
					</CheckUserAlreadyLoggedIn>
				}
			/>
			<Route
				path='/admin'
				element={
					<ProtectedRoute>
						<Admin />
					</ProtectedRoute>
				}
			>
				<Route index element={<Main />} />
				<Route path='settings' element={<Settings />} />
				<Route path='appearance' element={<Appearance />} />
				<Route path='analytics' element={<Analytics />} />
				<Route path='*' element={<Navigate to='/not-found' />} />
			</Route>
			<Route path='/u/:username' element={<PublicProfile />} />
			<Route path='*' element={<Navigate to='/not-found' />} />
			<Route path='/not-found' element={<NotFound />} />
		</Routes>
	);
}

export default App;
