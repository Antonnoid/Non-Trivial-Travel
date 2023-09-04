/* eslint-disable import/prefer-default-export */
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import * as api from './api';
import {CommentsOfPlaceState} from './types/states';

const initialState: CommentsOfPlaceState = {
  commentsPlace: [],
  error: undefined,
};

export const loadCommentsPlace = createAsyncThunk('comments/place/load', () =>
  api.fetchCommentOfPlaces()
);

const commentsOfPlaceSlice = createSlice({
  name: 'commentsPlace',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadCommentsPlace.fulfilled, (state, action) => {
      state.commentsPlace = action.payload;
    });
    builder.addCase(loadCommentsPlace.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export default commentsOfPlaceSlice.reducer;
