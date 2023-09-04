import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {RoutesState} from './type';
import * as api from './api';
import {City} from '../navbar/types/types';

export const initialState: RoutesState = {routes: [], error: ''};

export const routesInit = createAsyncThunk('routes/init', () =>
  api.routeInitFetch()
);
export const cityRoutesInit = createAsyncThunk(
  'routes/init/city',
  (id: City['id']) => api.routesInitFromCity(id)
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
      });
  },
});

export default routesSlice.reducer;
