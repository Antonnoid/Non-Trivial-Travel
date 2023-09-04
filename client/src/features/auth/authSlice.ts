import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {AuthState} from './type/AuthState';
import {UserAuthLog, UserAuthReg} from '../user/type';
import {
  fetchAuthCheckUser,
  fetchAuthUser,
  fetchLogOut,
  fetchRegisterUser,
} from './api';

const initialState: AuthState = {
  user: undefined,
  error: undefined,
};
export const registration = createAsyncThunk(
  'auth/registration',
  (value: UserAuthReg) => fetchRegisterUser(value)
);

export const authorization = createAsyncThunk(
  'auth/autorization',
  (value: UserAuthLog) => fetchAuthUser(value)
);

export const authChecUser = createAsyncThunk('auth/checkUser', () =>
  fetchAuthCheckUser()
);

export const logOut = createAsyncThunk('auth/logout', () => fetchLogOut());

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = undefined;
    },
  },
  extraReducers(builder) {
    builder.addCase(registration.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(registration.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(authorization.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(authorization.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(authChecUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(authChecUser.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(logOut.fulfilled, (state) => {
      state.user = undefined;
    });
    builder.addCase(logOut.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export const {clearError} = authSlice.actions;
export default authSlice.reducer;
