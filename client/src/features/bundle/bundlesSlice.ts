import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {BundlesState} from './type';
import * as api from './api';
import {City} from '../city/types/types';

const initialState: BundlesState = {bundles: [], error: ''};

export const bundlesInit = createAsyncThunk('bundles/init', () =>
  api.bundleInitFetch()
);

export const cityBundlesInit = createAsyncThunk(
  'bundles/init/city',
  (id: City['id']) => api.bundlesInitFromCity(id)
);

export const addBundle = createAsyncThunk(
  'bundles/add',
  ({
    title,
    description,
    isPublic,
    userId,
    cityId,
    bundlePlaces,
  }: {
    title: string;
    description: string;
    isPublic: boolean;
    userId: number;
    cityId: number;
    bundlePlaces: number[];
  }) => 
    api.bundleAddFetch({
      title,
      description,
      isPublic,
      userId,
      cityId,
      bundlePlaces,
    })
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
      })
      .addCase(addBundle.fulfilled, (state, action) => {
        state.bundles.push(action.payload);
      })
      .addCase(addBundle.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default bundlesSlice.reducer;
