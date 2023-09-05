/* eslint-disable import/prefer-default-export */
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import * as api from './api';
import {CommentsOfBundleState} from './types/states';
import {Bundle} from '../bundle/type';

const initialState: CommentsOfBundleState = {
  commentsBundle: [],
  error: undefined,
};

export const loadCommentsBundle = createAsyncThunk(
  'comments/bundle/load',
  (id: Bundle['id']) => api.fetchCommentOfBundles(id)
);

const commentsOfBundleSlice = createSlice({
  name: 'commentsBundle',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadCommentsBundle.fulfilled, (state, action) => {
      state.commentsBundle = action.payload;
    });
    builder.addCase(loadCommentsBundle.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export default commentsOfBundleSlice.reducer;
