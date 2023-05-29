/* eslint-disable @typescript-eslint/no-non-null-assertion */
// User State

// Dependencies
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
		updateUserDetails: (state, action: PayloadAction<Partial<User>>) => {
			state.user = { ...state.user, ...(action.payload as User) };
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

// User Action Exports
export const { loginUser, logoutUser, updateLinks, updateUserDetails } =
	userSlice.actions;

export default userSlice.reducer;
