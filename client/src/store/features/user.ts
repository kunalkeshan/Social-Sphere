/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../../../../@types';

interface UserState {
	user: User | null;
	token: string | null;
}

const initialState: UserState = {
	user:
		JSON.parse(localStorage.getItem('SocialSphereLoggedInUserDetails')!) ??
		null,
	token: localStorage.getItem('SocialSphereUserToken') ?? null,
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
	},
});

export const { loginUser } = userSlice.actions;

export default userSlice.reducer;
