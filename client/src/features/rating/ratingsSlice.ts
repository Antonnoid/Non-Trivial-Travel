import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {RatingsState} from './type';
import * as api from './api';
import {placeRatingAddFetch} from '../place/api';
import {Place} from '../place/type';

export const initialState: RatingsState = {ratings: [], error: ''};

export const ratingsInit = createAsyncThunk('ratings/init', () =>
  api.ratingInitFetch()
);
export const addRating = createAsyncThunk(
  'rating/add',
  ({rate, place}: {rate: number, place: Place}) => placeRatingAddFetch(rate, place)
);

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
  },
});

export default ratingsSlice.reducer;
