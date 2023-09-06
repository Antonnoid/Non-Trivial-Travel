/* eslint-disable import/prefer-default-export */
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import * as api from './api';
import {CommentsOfRouteState} from './types/states';
import {Route} from '../routes/type';
import {CommentOfRoute} from './types/types';

const initialState: CommentsOfRouteState = {
  commentsRoute: [],
  error: undefined,
};

export const loadCommentsRoute = createAsyncThunk(
  'comments/route/load',
  (id: Route['id']) => api.fetchCommentOfRoutes(id)
);
export const addCommentRoute = createAsyncThunk(
  'comments/route/add',
  ({text, routeId}: {text: string; routeId: string}) =>
    api.fetchCommentAddInRoute({text, routeId})
);
export const removeCommentRoute = createAsyncThunk(
  'comments/route/remove',
  (id: CommentOfRoute['id']) => api.fetchCommentRemoveInRoute(id)
);

const commentsOfRouteSlice = createSlice({
  name: 'commentsRoute',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadCommentsRoute.fulfilled, (state, action) => {
        state.commentsRoute = action.payload;
      })
      .addCase(loadCommentsRoute.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(addCommentRoute.fulfilled, (state, action) => {
        state.commentsRoute.push(action.payload);
      })
      .addCase(addCommentRoute.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(removeCommentRoute.fulfilled, (state, action) => {
        state.commentsRoute = state.commentsRoute.filter(
          (comment) => comment.id !== +action.payload
        );
      })
      .addCase(removeCommentRoute.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default commentsOfRouteSlice.reducer;
