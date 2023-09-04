import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Place, PlaceForAdd, PlacesState, PlaceId} from './type';
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
export const placeAddfromForm = createAsyncThunk(
  'places/add',
  (place: PlaceForAdd) => api.placeAdd(place)
);
export const placeRemove = createAsyncThunk('place/remove', (id: PlaceId) =>
  api.placeRemove(id)
);
export const placeInit = createAsyncThunk('place/init', (id: PlaceId) => {
  api.placePageFetch(id);
});

export const placePublish = createAsyncThunk(
  'places/publish',
  (place: Place) => {
    return api.placePublishFetch(place);
  }
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
      })
      .addCase(placeAddfromForm.fulfilled, (state, action) => {
        state.places.push(action.payload);
      })
      .addCase(placeAddfromForm.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(placePublish.fulfilled, (state, action) => {
        state.places = state.places.map((place) =>
          place.id === action.payload.id ? action.payload : place
        );
      })
      .addCase(placePublish.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(placeRemove.fulfilled, (state, action) => {
        state.places = state.places.filter(
          (place) => place.id !== +action.payload
        );
      })
      .addCase(placeRemove.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default placesSlice.reducer;
