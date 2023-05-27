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

function App() {
	return (
		<Routes>
			<Route path='/' element={<Landing />} />
			<Route path='/login' element={<Login />} />
			<Route path='/signup' element={<Signup />} />
			<Route path='/admin' element={<Admin />}>
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
