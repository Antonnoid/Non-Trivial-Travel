import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {PlacesState} from './type';
import * as api from './api';

export const initialState: PlacesState = {places: [], error: ''};

export const placesInit = createAsyncThunk('places/init', () =>
  api.placesInitFetch()
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
      });
  },
});

export default placesSlice.reducer;
