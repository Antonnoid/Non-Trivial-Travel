import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {PlacesState} from './type';
import * as api from './api';
import {City} from '../navbar/types/types';

export const initialState: PlacesState = {places: [], error: ''};

export const placesInit = createAsyncThunk('places/init', () =>
  api.placesInitFetch()
);
export const cityPlacesInit = createAsyncThunk(
  'places/init/city',
  (id: City['id']) => api.placesInitFromCity(id)
);

const placesSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(placesInit.fulfilled, (state, action) => {
        state.places = action.payload;
      })
      .addCase(placesInit.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(cityPlacesInit.fulfilled, (state, action) => {
        state.places = action.payload;
      })
      .addCase(cityPlacesInit.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default placesSlice.reducer;
