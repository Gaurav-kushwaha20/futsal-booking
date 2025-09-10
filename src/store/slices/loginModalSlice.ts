import { createSlice } from '@reduxjs/toolkit';

interface IAuthState {
 showLoginModal: boolean;
}
const initialState: IAuthState = {
 showLoginModal: false,
};

const loginModalSlice = createSlice({
 name: 'login_modal',
 initialState: initialState,
 reducers: {
  openModal(state) {
   state.showLoginModal = true;
  },
  closeModal(state) {
   state.showLoginModal = false;
  },
 },
});

export const { openModal, closeModal } = loginModalSlice.actions;
export default loginModalSlice.reducer;
