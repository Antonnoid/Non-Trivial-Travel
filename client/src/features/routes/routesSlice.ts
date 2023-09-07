import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Route, RoutesState} from './type';
import * as api from './api';
import {City} from '../city/types/types';

export const initialState: RoutesState = {
  routes: [],
  error: '',
};

export const routesInit = createAsyncThunk('routes/init', () =>
  api.routeInitFetch()
);
export const routerRemove = createAsyncThunk(
  'routes/remove',
  (id: Route['id']) => api.fetchRemoveRoute(id)
);
export const cityRoutesInit = createAsyncThunk(
  'routes/init/city',
  (id: City['id']) => api.routesInitFromCity(id)
);

export const addRoute = createAsyncThunk(
  'routes/add',
  ({
    title,
    description,
    isPublic,
    time,
    userId,
    cityId,
    routePlaces,
  }: {
    title: string;
    description: string;
    isPublic: boolean;
    time: string;
    userId: number;
    cityId: number;
    routePlaces: number[];
  }) =>
    api.routeAddFetch({
      title,
      description,
      isPublic,
      time,
      userId,
      cityId,
      routePlaces,
    })
);

const routesSlice = createSlice({
  name: 'routes',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(routesInit.fulfilled, (state, action) => {
        state.routes = action.payload;
      })
      .addCase(routesInit.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(cityRoutesInit.fulfilled, (state, action) => {
        state.routes = action.payload;
      })
      .addCase(cityRoutesInit.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(addRoute.fulfilled, (state, action) => {
        state.routes.push(action.payload);
      })
      .addCase(addRoute.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(routerRemove.fulfilled, (state, action) => {
        state.routes = state.routes.filter(
          (route) => route.id !== +action.payload
        );
      })
      .addCase(routerRemove.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default routesSlice.reducer;
