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
   state.showLoginModal = true;
  },
  closeUserLoginModal(state) {
   state.showLoginModal = false;
  },
 },
});

export const { openUserLoginModal, closeUserLoginModal } = userLoginModalSlice.actions;
export default userLoginModalSlice.reducer;
