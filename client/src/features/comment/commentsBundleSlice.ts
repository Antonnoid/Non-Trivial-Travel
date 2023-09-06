/* eslint-disable import/prefer-default-export */
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import * as api from './api';
import {CommentsOfBundleState} from './types/states';
import {Bundle} from '../bundle/type';
import {CommentOfBundle} from './types/types';

const initialState: CommentsOfBundleState = {
  commentsBundle: [],
  error: undefined,
};

export const loadCommentsBundle = createAsyncThunk(
  'comments/bundle/load',
  (id: Bundle['id']) => api.fetchCommentOfBundles(id)
);
export const addCommentBundle = createAsyncThunk(
  'comments/bundle/add',
  ({text, bundleId}: {text: string; bundleId: string}) =>
    api.fetchCommentAddInBundle({text, bundleId})
);
export const removeCommentBundle = createAsyncThunk(
  'comments/bundle/remove',
  (id: CommentOfBundle['id']) => api.fetchCommentRemoveInBundle(id)
);

const commentsOfBundleSlice = createSlice({
  name: 'commentsBundle',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadCommentsBundle.fulfilled, (state, action) => {
        state.commentsBundle = action.payload;
      })
      .addCase(loadCommentsBundle.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(addCommentBundle.fulfilled, (state, action) => {
        state.commentsBundle.push(action.payload);
      })
      .addCase(addCommentBundle.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(removeCommentBundle.fulfilled, (state, action) => {
        state.commentsBundle = state.commentsBundle.filter(
          (comment) => comment.id !== +action.payload
        );
      })
      .addCase(removeCommentBundle.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default commentsOfBundleSlice.reducer;
