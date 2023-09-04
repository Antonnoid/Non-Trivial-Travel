import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {BundlesState} from './type';
import * as api from './api';
import {City} from '../navbar/types/types';

const initialState: BundlesState = {bundles: [], error: ''};

export const bundlesInit = createAsyncThunk('bundles/init', () =>
  api.bundleInitFetch()
);

export const cityBundlesInit = createAsyncThunk(
  'bundles/init/city',
  (id: City['id']) => api.bundlesInitFromCity(id)
);

const bundlesSlice = createSlice({
  name: 'bundles',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(bundlesInit.fulfilled, (state, action) => {
        state.bundles = action.payload;
      })
      .addCase(bundlesInit.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(cityBundlesInit.fulfilled, (state, action) => {
        state.bundles = action.payload;
      })
      .addCase(cityBundlesInit.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default bundlesSlice.reducer;
