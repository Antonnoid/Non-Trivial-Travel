import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {RatingsState} from './type';
import * as api from './api';
import {placeRatingAddFetch} from '../place/api';
import {Place} from '../place/type';
import { bundleRatingAddFetch } from '../bundle/api';
import { Bundle } from '../bundle/type';
import { Route } from '../routes/type';
import { routeRatingAddFetch } from '../routes/api';

export const initialState: RatingsState = {ratings: [], error: ''};

export const ratingsInit = createAsyncThunk('ratings/init', () =>
  api.ratingInitFetch()
);
export const addRating = createAsyncThunk(
  'rating/add',
  ({rate, place}: {rate: number, place: Place}) => placeRatingAddFetch(rate, place)
);

export const ratingBundleAdd = createAsyncThunk(
  'bundleRating/add', ({rate, bundle}:{rate: number, bundle: Bundle}) => bundleRatingAddFetch(rate, bundle)
)

export const ratingRouteAdd = createAsyncThunk(
  'routeRating/add', ({rate, route}: {rate: number, route: Route}) => routeRatingAddFetch(rate, route)
)

const ratingsSlice = createSlice({
  name: 'ratings',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(ratingsInit.fulfilled, (state, action) => {
        state.ratings = action.payload;
      })
      .addCase(ratingsInit.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(addRating.fulfilled, (state, action) => {
        state.ratings.push(action.payload)
      })
      .addCase(addRating.rejected, (state, action) => {
        state.error = action.error.message
      })
      .addCase(ratingBundleAdd.fulfilled, (state, action) => {
        state.ratings.push(action.payload)
      })
      .addCase(ratingBundleAdd.rejected, (state, action) => {
        state.error = action.error.message
      })
      .addCase(ratingRouteAdd.fulfilled, (state, action) => {
        state.ratings.push(action.payload)
      })
      .addCase(ratingRouteAdd.rejected, (state, action) => {
        state.error = action.error.message
      })
  },
});

export default ratingsSlice.reducer;
