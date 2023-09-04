/* eslint-disable import/prefer-default-export */
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import * as api from './api';
import {CommentsOfRouteState} from './types/states';

const initialState: CommentsOfRouteState = {
  commentsRoute: [],
  error: undefined,
};

export const loadCommentsRoute = createAsyncThunk('comments/route/load', () =>
  api.fetchCommentOfRoutes()
);

const commentsOfRouteSlice = createSlice({
  name: 'commentsRoute',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadCommentsRoute.fulfilled, (state, action) => {
      state.commentsRoute = action.payload;
    });
    builder.addCase(loadCommentsRoute.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export default commentsOfRouteSlice.reducer;
