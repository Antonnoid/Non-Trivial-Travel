import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {State} from './types/State';
import * as api from './api';

const initialState: State = {
  cities: [],
  error: undefined,
};

export const loadCities = createAsyncThunk('cities/load', () =>
  api.fetchCity()
);
export const loadCitiesPopular = createAsyncThunk('cities/load/popular', () =>
  api.fetchCityPopular()
);
export const loadCitiesByLetter = createAsyncThunk(
  'cities/load/search/name',
  (name: string) => api.fetchCityByLetter(name)
);

const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadCities.fulfilled, (state, action) => {
        state.cities = action.payload;
      })
      .addCase(loadCitiesPopular.fulfilled, (state, action) => {
        state.cities = action.payload;
      })
      .addCase(loadCitiesByLetter.fulfilled, (state, action) => {
        state.cities = action.payload;
      })

      .addCase(loadCities.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(loadCitiesByLetter.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});
export default citiesSlice.reducer;
