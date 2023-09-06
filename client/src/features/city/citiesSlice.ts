import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {State} from './types/State';
import * as api from './api';

const initialState: State = {
  cities: [],
  allCities: [],
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

export const allCitiesInit = createAsyncThunk('cities/all/init', () =>
  api.fetchCity()
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
      .addCase(allCitiesInit.fulfilled, (state, action) => {
        state.allCities = action.payload;
      })
      .addCase(allCitiesInit.rejected, (state, action) => {
        state.error = action.error.message;
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
