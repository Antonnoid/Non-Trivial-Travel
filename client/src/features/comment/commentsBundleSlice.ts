/* eslint-disable import/prefer-default-export */
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import * as api from './api';
import {CommentsOfBundleState} from './types/states';

const initialState: CommentsOfBundleState = {
  commentsBundle: [],
  error: undefined,
};

export const loadCommentsBundle = createAsyncThunk('comments/bundle/load', () =>
  api.fetchCommentOfBundles()
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
