/* eslint-disable import/prefer-default-export */
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import * as api from './api';
import {CommentsOfPlaceState} from './types/states';
import {Place} from '../place/type';
import {CommentOfPlace} from './types/types';

const initialState: CommentsOfPlaceState = {
  commentsPlace: [],
  error: undefined,
};

export const loadCommentsPlace = createAsyncThunk(
  'comments/place/load',
  (id: Place['id']) => api.fetchCommentOfPlaces(id)
);
export const addCommentPlace = createAsyncThunk(
  'comments/place/add',
  ({text, placeId}: {text: string; placeId: string}) =>
    api.fetchCommentAddInPlace({text, placeId})
);
export const removeCommentPlace = createAsyncThunk(
  'comments/place/remove',
  (id: CommentOfPlace['id']) => api.fetchCommentRemoveInPlace(id)
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
      .addCase(addCommentPlace.fulfilled, (state, action) => {
        state.commentsPlace.push(action.payload);
      })
      .addCase(addCommentPlace.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(removeCommentPlace.fulfilled, (state, action) => {
        state.commentsPlace = state.commentsPlace.filter(
          (comment) => comment.id !== +action.payload
        );
      })
      .addCase(removeCommentPlace.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default commentsOfPlaceSlice.reducer;
