'use client';
import { initKeycloak } from '@/lib/keycloak';
import { createSlice } from '@reduxjs/toolkit';

interface IAuthState {
	showLoginModal: boolean;
}
const initialState: IAuthState = {
	showLoginModal: false,
};

const userLoginModalSlice = createSlice({
	name: 'user_login_modal',
	initialState: initialState,
	reducers: {
		openUserLoginModal(state) {
			if (typeof window !== 'undefined') {
				initKeycloak().then((keycloak) => {
					keycloak.login({
						redirectUri: window.location.href,
					});
				});
			}
			state.showLoginModal = true;
		},
		closeUserLoginModal(state) {
			state.showLoginModal = false;
		},
	},
});

export const { openUserLoginModal, closeUserLoginModal } = userLoginModalSlice.actions;
export default userLoginModalSlice.reducer;
