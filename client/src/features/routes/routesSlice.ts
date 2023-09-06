import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {RoutesState} from './type';
import * as api from './api';
import {City} from '../city/types/types';

export const initialState: RoutesState = {
  routes: [],
  error: '',
  pending: false,
};

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
  reducers: {
    stopPending: (state) => {
      state.pending = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(routesInit.fulfilled, (state, action) => {
        state.routes = action.payload;
      })
      .addCase(routesInit.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(cityRoutesInit.pending, (state) => {
        state.pending = true;
      })
      .addCase(cityRoutesInit.fulfilled, (state, action) => {
        state.pending = false;
        state.routes = action.payload;
      })
      .addCase(cityRoutesInit.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const {stopPending} = routesSlice.actions;
export default routesSlice.reducer;
