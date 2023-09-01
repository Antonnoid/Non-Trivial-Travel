import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {AuthState} from './type/AuthState';
import {UserAuth} from '../user/type';
import {fetchAuthUser, fetchLogOut} from './api';

const initialState: AuthState = {
  user: undefined,
  error: undefined,
};

export const authorization = createAsyncThunk('users/auth', (value: UserAuth) =>
  fetchAuthUser(value)
);

export const logOut = createAsyncThunk('auth/logout', () => fetchLogOut());

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(authorization.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(authorization.rejected, (state, action) => {
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

export default authSlice.reducer;
