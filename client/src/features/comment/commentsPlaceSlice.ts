/* eslint-disable import/prefer-default-export */
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import * as api from './api';
import {CommentsOfPlaceState} from './types/states';
import {Place} from '../place/type';

const initialState: CommentsOfPlaceState = {
  commentsPlace: [],
  error: undefined,
};

export const loadCommentsPlace = createAsyncThunk(
  'comments/place/load',
  (id: Place['id']) => api.fetchCommentOfPlaces(id)
);
export const addCommentsPlace = createAsyncThunk(
  'comments/place/add',
  ({text, placeId}: {text: string; placeId: string}) =>
    api.fetchCommentAddInPlace({text, placeId})
);

const commentsOfPlaceSlice = createSlice({
  name: 'commentsPlace',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadCommentsPlace.fulfilled, (state, action) => {
        state.commentsPlace = action.payload;
      })
      .addCase(loadCommentsPlace.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(addCommentsPlace.fulfilled, (state, action) => {
        state.commentsPlace.push(action.payload);
      });
  },
});

export default commentsOfPlaceSlice.reducer;
