/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Link, User } from '../../../../@types';

interface UserState {
	user: User | null;
	token: string | null;
	links?: Link[];
}

const initialState: UserState = {
	user:
		JSON.parse(localStorage.getItem('SocialSphereLoggedInUserDetails')!) ??
		null,
	token: localStorage.getItem('SocialSphereUserToken') ?? null,
	links:
		JSON.parse(sessionStorage.getItem('SocialSphereLoggedInUserLinks')!) ??
		null,
};

export const userSlice = createSlice({
	initialState,
	name: 'user',
	reducers: {
		loginUser: (
			state,
			action: PayloadAction<{ user: User; token: string }>
		) => {
			state.user = action.payload.user;
			state.token = action.payload.token;
			localStorage.setItem(
				`SocialSphereLoggedInUserDetails`,
				JSON.stringify(action.payload.user)
			);
			localStorage.setItem(`SocialSphereUserToken`, action.payload.token);
		},
		updateLinks: (state, action: PayloadAction<Link[]>) => {
			state.links = action.payload;
			sessionStorage.setItem(
				`SocialSphereLoggedInUserLinks`,
				JSON.stringify(action.payload)
			);
		},
		logoutUser: (state) => {
			state.user = null;
			state.token = null;
			localStorage.clear();
			sessionStorage.clear();
		},
	},
});

export const { loginUser, logoutUser, updateLinks } = userSlice.actions;

export default userSlice.reducer;
