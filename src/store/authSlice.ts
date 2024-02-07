import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AppUser, UserAuth } from 'models/user.model';
import { AppDispatch } from './store';
import AuthService from 'services/auth.service';

const initialState: UserAuth = {
  user: null,
  status: 'pending'
};

const userAuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateUser(state, action: PayloadAction<AppUser | null>) {
      if (action.payload) {
        state.status = 'in';
        state.user = action.payload;
      } else {
        state.status = 'out';
      }
    },
    userLoggedIn(state, action: PayloadAction<AppUser | null>) {},
    userLoggedOut(state) {}
  }
});

export function userInit() {
  return function userInitThunk(dispatch: AppDispatch, storeAPI: any) {
    const user = AuthService.init();
    dispatch(updateUser(user));
  };
}

export function login(user: AppUser) {
  return function loginThunk(dispatch: AppDispatch, storeAPI: any) {
    AuthService.login(user);
    dispatch(userLoggedIn(user));
  };
}

export function logout() {
  return function logoutThunk(dispatch: AppDispatch, storeAPI: any) {
    AuthService.logout();
    dispatch(userLoggedOut());
  };
}

export const { updateUser, userLoggedIn, userLoggedOut } = userAuthSlice.actions;
export default userAuthSlice.reducer;
