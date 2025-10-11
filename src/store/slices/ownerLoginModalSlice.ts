import { createSlice } from '@reduxjs/toolkit';

interface IOwnerLoginModalState {
	showLoginMoal: boolean;
}
const initialState: IOwnerLoginModalState = {
	showLoginMoal: false,
};
const ownerLoginModalSlice = createSlice({
	name: 'owner_login_modal',
	initialState: initialState,
	reducers: {
		openOwnerLoginModal(state) {
			state.showLoginMoal = true;
		},
		closeOwnerLoginModal(state) {
			state.showLoginMoal = false;
		},
	},
});
export const { openOwnerLoginModal, closeOwnerLoginModal } = ownerLoginModalSlice.actions;
export default ownerLoginModalSlice.reducer;
