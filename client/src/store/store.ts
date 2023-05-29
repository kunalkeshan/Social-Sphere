/**
 * Application State
 */

// Dependencies
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user';

const store = configureStore({
	reducer: {
		user: userReducer,
	},
});

// Store Type Exports
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
