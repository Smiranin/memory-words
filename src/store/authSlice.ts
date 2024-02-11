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
      console.log(
        '%c Debug:',
        'background: #0E1926; color: #8EFF1E; padding: 8px 12px; font-size: 14px;',
        action.payload
      );
      if (action.payload) {
        state.status = 'in';
        state.user = action.payload;
      } else {
        state.status = 'out';
      }
    },
    userLoggedIn(state, action: PayloadAction<AppUser | null>) {
      state.user = action.payload;
      state.status = 'in';
    },
    userLoggedOut(state) {
      state.user = null;
      state.status = 'out';
    }
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
